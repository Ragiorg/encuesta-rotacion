'use client';

import React, { useEffect, useState } from 'react'
import QuestionarieForm from '@/components/ui/questionarie' // import existing component from your ui folder
import { useParams } from 'next/navigation';

export default function EmployeeSurveyPage() {
    const { workerId } = useParams<{ workerId: string }>()
    return <SurveyLoader workerId={workerId} />
}

/* ---------- Loader + fetch logic ---------- */

function SurveyLoader({ workerId }: { workerId: string }) {
    const [loading, setLoading] = useState(true)
    const [surveyData, setSurveyData] = useState<any | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let mounted = true
        setLoading(true)
        setError(null)

        fetchSurveyResponses(workerId)
            .then((res) => {
                if (!mounted) return
                setSurveyData({questions: [...res.surveyQuestions], isCompleted: res.success ? res.responses.isCompleted : false, surveyId: res?.responses?.id, responses: res?.responses, worker: res.worker});
            })
            .catch((err) => {
                if (!mounted) return
                setError(err?.message ?? 'Error al cargar la encuesta')
            })
            .finally(() => {
                if (!mounted) return
                setLoading(false)
            })

        return () => {
            mounted = false
        }
    }, [workerId]);

    const determineTurnoverRisk = (survey: any) => {
        // Implement your logic to determine turnover risk based on responses
        // Number of questions with category satisfactionScore
        const totalQuestions = surveyData.questions.filter((question: any) => question.category === 'satisfactionScore')?.length;
        // Calculate average satisfaction score
        const averageSatisfaction = survey.satisfactionScore / totalQuestions;
        // Determine risk level
        if (averageSatisfaction < 3) {
            return 'High';
        } else if (averageSatisfaction < 4) {
            return 'Medium';
        } else {
            return 'Low';
        }
    }


    const submitSurveyResponses = async (responses: any) => {
        try {
        const response = await fetch('/api/survey-responses', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            { 
                ...responses,
                surveyId: surveyData.surveyId || null,
                isCompleted: surveyData.questions.length === responses.responses.length,
                workerId: surveyData?.worker.id,
                organizationId: surveyData?.worker.organizationId,
                organizationName: surveyData?.worker.organizationName,
                turnoverRisk: determineTurnoverRisk(responses),
                yearsInCompany: surveyData?.worker.hiredAt ? new Date().getFullYear() - new Date(surveyData.worker.hiredAt).getFullYear() : 0,
                department: surveyData?.worker.department.name || null,
                position: surveyData?.worker.position.title || null

            }),
        });

        const data = await response.json();
        if (response.ok) {
            // Handle successful submission
            console.log('Survey responses submitted successfully:', data);
            setSurveyData({...surveyData, responses: data, surveyId: data.responseId, ...data.data});
        } else {
            // Handle errors
            console.error('Error submitting survey responses:', data);
        }

        } catch (error) {
            console.error('Error submitting survey responses:', error);
        }
    }

    if (loading) return <Loading />
    if (error) return <ErrorDisplay message={error} />
    if (!surveyData) return <ErrorDisplay message="No surveyData returned from server" />

    if (surveyData.isCompleted) {
        return <ThanksForResponding worker={surveyData.worker} />
    }

    return (
        <div className="mx-auto p-6 space-y-6">
            <AnimatedSummary worker={surveyData.worker} />
            <QuestionarieForm
                questions={surveyData?.questions}
                saveResponses={async (surveyData) => await submitSurveyResponses(surveyData)}
                defaultQuestionIndex={surveyData?.responses ? surveyData?.responses.length - 1 : 0}
                responsesProgressData={surveyData?.responses}
            />
        </div>
    )
}

/* ---------- API helpers (adjust endpoints to your backend) ---------- */

async function fetchSurveyResponses(workerId: string): Promise<any> {
    const res = await fetch(`/api/survey-responses/${workerId}`, {
        cache: 'no-store',
    })
    if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`)
    }
    const json = await res.json()
    return json as any
}


/* ---------- UI Subcomponents (Tailwind) ---------- */

function Loading() {
    return (
        <div className="flex h-96 flex-col items-center justify-center p-10 text-gray-700">
            <div className="w-5 h-5 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin mb-3" aria-hidden />
            <div>Cargando encuesta…</div>
        </div>
    )
}

function ErrorDisplay({ message }: { message: string }) {
    return (
        <div className="flex items-center justify-center p-8 text-red-600">
            <strong className="mr-2">Error:</strong> {message}
        </div>
    )
}

function AnimatedSummary({ worker }: { worker: Record<string, any> }) {
    const [show, setShow] = useState(false)
    useEffect(() => {
        const id = setTimeout(() => setShow(true), 20)
        return () => clearTimeout(id)
    }, [])

    return (
        <div className={`transform transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <div className="p-4 rounded-lg bg-white shadow-sm border">
                <h2 className="text-lg font-semibold">{worker.firstName + ' ' + worker.lastName}</h2>
                {worker?.position && <div className="text-sm text-gray-600 mt-1">{worker.position.title}</div>}
                {worker?.department && <div className="text-sm text-gray-600">{worker.department.name}</div>}
                {worker?.Organization && <div className="text-sm text-gray-600">{worker.Organization.name}</div>}
                <div className="mt-2">
                    <small className="text-gray-500">Por favor, revisa que tu información sea correcta antes de continuar.</small>
                </div>
            </div>
        </div>
    )
}

function ThanksForResponding({ worker }: { worker: Record<string, any> }) {
    return (
        <div className="flex items-center justify-center p-10">
            <div className="w-full max-w-2xl p-6 rounded-lg bg-indigo-50 border border-indigo-100 shadow-sm text-center">
                <h2 className="text-xl font-semibold">¡Gracias por responder, {worker?.firstName +' '+ worker?.lastName}!</h2>
                <p className="mt-2 text-gray-700">Tu opinión es importante y ha sido registrada.</p>
                <hr className="my-4 border-gray-200" />
                <div className="text-sm text-gray-600">
                    Ten en cuenta: las respuestas se recopilan para mejorar la experiencia laboral. Tus respuestas serán tratadas
                    de forma confidencial y utilizadas únicamente para análisis internos. Si tienes más preguntas, por favor contacta a Recursos Humanos.
                </div>
            </div>
        </div>
    )
}
