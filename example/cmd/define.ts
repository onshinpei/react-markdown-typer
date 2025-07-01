

export enum CozeMessageEnum {
  Created = 'event:conversation.chat.created',
  InProgress = 'event:conversation.chat.in_progress',
  Delta = 'event:conversation.message.delta',
  MessageCompleted = 'event:conversation.message.completed',
  ChatCompleted = 'event:conversation.chat.completed',
}


export interface CozeResultI {
  content?: string;
  usage?: {
    token_count: number;
    output_count: number;
    input_count: number;
  };
  completed_at?: number;
  created_at?: number;
}

export interface CozeMessageDataI extends CozeResultI {
  id: string;
  conversation_id: string;
  bot_id: string;
  last_error: { code: number; msg: string };
  status: string;
  role?: 'user' | 'assistant';

  /**
   * 推理思考过程
   */
  reasoning_content?: string;
  type?: 'answer';

}

export interface CozeMessageI {
  type: CozeMessageEnum;
  data: CozeMessageDataI;
}
