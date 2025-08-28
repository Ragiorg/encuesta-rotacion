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
}

interface SurveyResponses {
  responses: {
    question: string;
    answer: number
  }[];
  satisfactionScore: number | null;
  workLifeBalance: number | null;
  careerDevelopment: number | null;
  managementQuality: number | null;
  compensationSatisfaction: number | null;
  workEnvironment: number | null;
}

interface QuestionarieFormProps {
  questions: Questionarie[];
  saveResponses: (responses: SurveyResponses) => void;
  defaultQuestionIndex?: number;
}

const QuestionarieForm: React.FC<QuestionarieFormProps> = ({ questions, saveResponses, defaultQuestionIndex }) => {
  // This component will render the questions and handle responses
  const [responsesData, setResponses] = React.useState<SurveyResponses>({
    responses: [],
    satisfactionScore: null,
    workLifeBalance: null,
    careerDevelopment: null,
    managementQuality: null,
    compensationSatisfaction: null,
    workEnvironment: null,
  });

  const [selectedQuestion, setSelectedQuestion] = React.useState<Questionarie | null>(questions[defaultQuestionIndex || 0] || null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = React.useState<number>(defaultQuestionIndex || 0);

  const handleSelectResponse = (question: Questionarie, answer: number) => {
    if (responsesData.responses[selectedQuestionIndex]?.question === question.pregunta) {
      const updatedResponses = [...responsesData.responses];
      // prev value of the answer
      const prevAnswer = updatedResponses[selectedQuestionIndex]?.answer;
      updatedResponses[selectedQuestionIndex] = { question: question.pregunta, answer };
      setResponses({ ...responsesData, responses: updatedResponses, [question.categoria]: (responsesData[question.categoria] || 0) + (answer - (prevAnswer || 0)) });
    } else {
      setResponses({ ...responsesData, responses: [...responsesData.responses, { question: question.pregunta, answer }], [question.categoria]: (responsesData[question.categoria] || 0) + answer });
    }
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
            <h2 className="text-2xl text-center">#{selectedQuestion.id}-. {selectedQuestion.pregunta}</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delayChildren: stagger(0.4) }}
              className="flex flex-col space-y-2 lg:w-[70vw] md:w-[90vw] sm:w-full mx-auto"
            >
              {selectedQuestion.opciones.map((option) => {
                const isSelected = responsesData.responses.some(response => response.question === selectedQuestion.pregunta && response.answer === option.valor);
                return (
                  <button className={`p-2 border shadow rounded border-gray-200 ${isSelected ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} key={option.valor} onClick={() => {
                    handleSelectResponse(selectedQuestion, option.valor);
                  }}>
                    <h4 className={`font-semibold text-lg ${isSelected ? 'text-white font-bold' : 'text-black'}`}>{option.texto}</h4>
                  </button>
                );
              })}
            </motion.div>
            <div className="flex justify-between mt-4 space-y-2 lg:w-[70vw] md:w-[90vw] sm:w-full mx-auto">
              <button
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
