export type V3DMessageAction = 'LOAD_SCENE' | 'CHANGE_MATERIAL' | 'PLAY_ANIMATION' | 'APP_LOADED' | 'OBJECT_CLICKED';

export interface V3DMessage {
  action: V3DMessageAction;
  payload?: any;
}

// Segédfüggvény az üzenet validáláshoz
export const isV3DMessage = (data: any): data is V3DMessage => {
  return data && typeof data.action === 'string';
};
