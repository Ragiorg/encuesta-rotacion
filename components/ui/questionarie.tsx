import { motion, stagger } from "framer-motion";
import React from "react";

interface Questionarie {
  id: number;
  pregunta: string;
  categoria: QuestionarieType;
  opciones: {
    texto: string;
    valor: number;
  }[];
}

enum QuestionarieType {
  SATISFACTION_SCORE = "satisfactionScore",
  WORK_LIFE_BALANCE = "workLifeBalance",
  CAREER_DEVELOPMENT = "careerDevelopment",
  MANAGEMENT_QUALITY = "managementQuality",
  COMPENSATION_SATISFACTION = "compensationSatisfaction",
  WORK_ENVIRONMENT = "workEnvironment",
  AGE_RANGE = "ageRange",
  RECOMMEND_COMPANY = "recommendCompany"
}

interface SurveyResponses {
  responses: {
    question: string;
    answer: number | boolean | string;
  }[];
  satisfactionScore: number | null;
  workLifeBalance: number | null;
  careerDevelopment: number | null;
  managementQuality: number | null;
  compensationSatisfaction: number | null;
  workEnvironment: number | null;
  recommendCompany: boolean | null;
  ageRange: string | null;
}

interface QuestionarieFormProps {
  questions: Questionarie[];
  saveResponses: (responses: SurveyResponses) => Promise<void>;
  defaultQuestionIndex?: number;
  responsesProgressData?: SurveyResponses;
}

const QuestionarieForm: React.FC<QuestionarieFormProps> = ({ questions, saveResponses, defaultQuestionIndex, responsesProgressData }) => {
  // This component will render the questions and handle responses
  const [responsesData, setResponses] = React.useState<SurveyResponses>(responsesProgressData? {...responsesProgressData} : {
    responses: [],
    satisfactionScore: null,
    workLifeBalance: null,
    careerDevelopment: null,
    managementQuality: null,
    compensationSatisfaction: null,
    workEnvironment: null,
    recommendCompany: null,
    ageRange: null
  });
  const [disabledActions, setDisabledActions] = React.useState<boolean>(false);

  const [selectedQuestion, setSelectedQuestion] = React.useState<Questionarie | null>(questions[defaultQuestionIndex || 0] || null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = React.useState<number>(defaultQuestionIndex || 0);

  const handleSelectResponse = async (question: Questionarie, answer: number | boolean | string ) => {
    if (question.categoria === QuestionarieType.RECOMMEND_COMPANY && typeof answer === 'boolean') {
      const updatedResponses = [...responsesData.responses];
      updatedResponses[selectedQuestionIndex] = { question: question.pregunta, answer };
      setResponses({ ...responsesData, recommendCompany: answer, responses: updatedResponses });
      return;
    }
    if (question.categoria === QuestionarieType.AGE_RANGE && typeof answer === 'string') {
      const updatedResponses = [...responsesData.responses];
      updatedResponses[selectedQuestionIndex] = { question: question.pregunta, answer };
      setResponses({ ...responsesData, ageRange: answer, responses: updatedResponses });
      return;
    }
    let newResponseData = { ...responsesData };
    // check if the question already exists in the responses array
    if (responsesData.responses[selectedQuestionIndex]?.question === question.pregunta && typeof answer === 'number') {
      const updatedResponses = [...responsesData.responses];
      // prev value of the answer
      const prevAnswer = updatedResponses[selectedQuestionIndex]?.answer;
      updatedResponses[selectedQuestionIndex] = { question: question.pregunta, answer };
      setResponses({ 
        ...responsesData, 
        responses: updatedResponses, 
        [question.categoria]: 
          (typeof responsesData[question.categoria] === 'number' ? responsesData[question.categoria] as number : 0) 
          + (typeof answer === 'number' ? answer : 0) 
          - (typeof prevAnswer === 'number' ? prevAnswer : 0)
      });
      newResponseData = {
        ...responsesData,
        responses: updatedResponses,
        [question.categoria]: 
          (typeof responsesData[question.categoria] === 'number' ? responsesData[question.categoria] as number : 0) 
          + (typeof answer === 'number' ? answer : 0) 
          - (typeof prevAnswer === 'number' ? prevAnswer : 0)
      };
    } else if (typeof answer === 'number') {
      setResponses({ 
        ...responsesData, 
        responses: [...responsesData.responses, { question: question.pregunta, answer }],
        [question.categoria]: typeof responsesData[question.categoria] === 'number'
          ? (responsesData[question.categoria] as number) + (typeof answer === 'number' ? answer : 0)
          : answer
      });
      newResponseData = {
        ...responsesData,
        responses: [...responsesData.responses, { question: question.pregunta, answer }],
        [question.categoria]: typeof responsesData[question.categoria] === 'number'
          ? (responsesData[question.categoria] as number) + (typeof answer === 'number' ? answer : 0)
          : answer
      };
    }
    setDisabledActions(true);
    await saveResponses(newResponseData);
    setDisabledActions(false);
  };

  return (
    <div>
      {/*progress bar*/}
      <h1 className="w-full my-4 text-3xl font-semibold text-center">Progreso de la Encuesta</h1>
      <div className="mb-4">
        <div className="h-2 bg-gray-200 rounded-full width-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-in-out"
            style={{ width: `${((responsesData.responses.length + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      { selectedQuestion &&
        <motion.div key={selectedQuestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delayChildren: stagger(0.4) }}
            className="flex flex-col space-y-4"
          >
            <h2 className="text-2xl text-center">{selectedQuestion.id > 0 ? `#${selectedQuestion.id} -.` : ''} {selectedQuestion.pregunta}</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delayChildren: stagger(0.4) }}
              className="flex flex-col space-y-2 lg:w-[70vw] md:w-[90vw] sm:w-full mx-auto"
            >
              {selectedQuestion.opciones.map((option) => {
                const isSelected = responsesData.responses.some(response => response.question === selectedQuestion.pregunta && response.answer === option.valor);
                return (
                  <button disabled={disabledActions} className={`p-2 border shadow rounded border-gray-200 ${isSelected ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} key={option.valor} onClick={() => {
                    handleSelectResponse(selectedQuestion, option.valor);
                  }}>
                    <h4 className={`font-semibold text-lg ${isSelected ? 'text-white font-bold' : 'text-black'}`}>{option.texto}</h4>
                  </button>
                );
              })}
            </motion.div>
            <div className="flex justify-between mt-4 space-y-2 lg:w-[70vw] md:w-[90vw] sm:w-full mx-auto">
              <button
                disabled={disabledActions}
                className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors duration-200 ease-in-out"
                onClick={() => {
                  if (selectedQuestionIndex > 0) {
                    setSelectedQuestionIndex(selectedQuestionIndex - 1);
                    setSelectedQuestion(questions[selectedQuestionIndex - 1]);
                  }
                }}
              >
                Anterior
              </button>
              <button
                disabled={disabledActions}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 ease-in-out"
                onClick={() => {
                  if (selectedQuestionIndex < questions.length - 1) {
                    setSelectedQuestionIndex(selectedQuestionIndex + 1);
                    setSelectedQuestion(questions[selectedQuestionIndex + 1]);
                  } else {
                    saveResponses(responsesData);
                  }
                }}
              >
                {selectedQuestionIndex < questions.length - 1 ? 'Siguiente' : 'Enviar'}
              </button>
            </div>
          </motion.div>
        }
    </div>
  );
};

export default QuestionarieForm;
