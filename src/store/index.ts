import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex'
import { TIPOS_MUTACOES } from './tipos-mutacoes';
import INotificao from '@/interfaces/INotificacao';
import { EstadoProjeto, projeto } from './modulos/projeto';
import { EstadoTarefa, tarefa } from './modulos/tarefa';

export interface Estado {
  projeto: EstadoProjeto;
  tarefa: EstadoTarefa;
  notificacoes: INotificao[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projeto: {
      projetos: []
    },
    tarefa: {
      tarefas: []
    },
    notificacoes: [],
  },
  mutations: {
    //mutations de notiificações
    [TIPOS_MUTACOES.NOTIFICAR](state, novaNotificacao: INotificao) {
      novaNotificacao.id = new Date().getTime();
      novaNotificacao.intervalo = novaNotificacao.intervalo || 3000;
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notificacao) => notificacao.id !== novaNotificacao.id
        );
      }, novaNotificacao.intervalo);
    },
  },
  modules: {
    projeto,
    tarefa
  }
});
