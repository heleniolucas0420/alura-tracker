import { TIPOS_NOTIFICACAO } from '@/interfaces/INotificacao';
import { store } from '@/store';
import { TIPOS_MUTACOES } from '@/store/tipos-mutacoes';

export type Notificador = {
  notificar: (
    tipo: TIPOS_NOTIFICACAO,
    titulo: string,
    texto: string,
    interval?: number
  ) => void;
};

export default (): Notificador => {
  const notificar = (
    tipo: TIPOS_NOTIFICACAO,
    titulo: string,
    texto: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    intervalo?: number
  ) => {
    store.commit(TIPOS_MUTACOES.NOTIFICAR, {
      titulo,
      texto,
      tipo,
      intervalo
    });
  };

  return {
    notificar,
  };
};
