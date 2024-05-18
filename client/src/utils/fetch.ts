import { APIErrorResponse, ErrorTypeEnum } from '@/types/api';
import { ChatMessageError } from '@/types/chat';

const getMessageByErrorType = (errorType: ErrorTypeEnum) => {
  const errorMap = {
    API_KEY_MISSING: 'OpenAI API Key 为空，请添加自定义 OpenAI API Key',
    INTERNAL_SERVER_ERROR: '服务器错误，请联系管理员',
    OPENAI_API_ERROR: 'OpenAI API 错误，请检查 OpenAI API Key 和 Endpoint 是否正确',
  };
  return errorMap[errorType] || 'unknown error';
};
/**
 * @description: 封装fetch请求，使用流式方法获取数据
 */
export const fetchSEE = async (
  fetcher: () => Promise<Response>,
  handler: {
    onMessageError?: (error: ChatMessageError) => void;
    onMessageUpdate?: (text: string) => void;
    onImagePromptStart?: () => void;
    onImagePromptEnd?: (text: string) => void;
  },
) => {
  const res = await fetcher();

  if (!res.ok) {
    const data = (await res.json()) as APIErrorResponse;

    handler.onMessageError?.({
      body: data.body,
      message: getMessageByErrorType(data.errorType),
      type: data.errorType,
    });
    return;
  }

  const returnRes = res.clone();

  const data = res.body;

  if (!data) return;

  const reader = data.getReader();
  const decoder = new TextDecoder('utf8');

  let done = false;
  let accumulatedText = '';
  let isImageGeneration = false;
  let buffer = '';

  while (!done) {
    const {value, done: doneReading} = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value, {stream: true});
    buffer += chunkValue;

    let boundary = buffer.indexOf('}{');

    while (boundary !== -1) {
      const completeJson = buffer.slice(0, boundary + 1);
      buffer = buffer.slice(boundary + 1);

      try {
        const parsedData = JSON.parse(completeJson);

        if (parsedData.isTextPromt) {
          handler.onMessageUpdate?.(parsedData.content);
        } else if(parsedData.isImagePrompt) {
          accumulatedText += parsedData.content;
          isImageGeneration = true;

          //todo remove after image adding image generation component
          handler.onMessageUpdate?.(parsedData.content);
        }
      } catch (error) {
        console.error('Parsing error:', error);
      }

      boundary = buffer.indexOf('}{');
    }
  }

  if (isImageGeneration){
    handler.onImagePromptEnd?.(accumulatedText);
  }
  return returnRes;
};
