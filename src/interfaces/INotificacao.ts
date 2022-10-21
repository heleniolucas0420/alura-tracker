export enum TIPOS_NOTIFICACAO {
  SUCESSO,
  ATENCAO,
  FALHA
}

export default interface INotificao {
  id: number;
  tipo: TIPOS_NOTIFICACAO;
  titulo: string;
  texto: string;
  intervalo: number;
}