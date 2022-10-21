import { TIPOS_NOTIFICACAO } from '@/interfaces/INotificacao';
import { store } from '@/store';
import { TIPOS_MUTACOES } from '@/store/tipos-mutacoes';

export const notificarMixin = {
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    notificar(tipo: TIPOS_NOTIFICACAO, titulo: string, texto: string, interval?: number) {
      store.commit(TIPOS_MUTACOES.NOTIFICAR, {
        titulo,
        texto,
        tipo,
      });
    },
  },
};
