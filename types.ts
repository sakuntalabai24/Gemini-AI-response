export enum ToolType {
  ASK = 'ASK',
  SUMMARIZE = 'SUMMARIZE',
  IDEAS = 'IDEAS',
  DEFINE = 'DEFINE'
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface IdeaResponse {
  ideas: string[];
}

export interface DefinitionResponse {
  word: string;
  definition: string;
  example: string;
  synonyms: string[];
}