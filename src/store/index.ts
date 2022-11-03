import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import IProjeto from '@/interfaces/IProjeto';
import ITarefa from '@/interfaces/ITarefa';
import { TIPOS_MUTACOES } from './tipos-mutacoes';
import INotificao from '@/interfaces/INotificacao';
import { TIPOS_ACOES } from './tipo-acoes';
import httpAxios from '@/http';

interface Estado {
  projetos: IProjeto[];
  tarefas: ITarefa[];
  notificacoes: INotificao[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: [],
    tarefas: [],
    notificacoes: [],
  },
  mutations: {
    //mutations de projetos
    [TIPOS_MUTACOES.DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
    },
    [TIPOS_MUTACOES.ADICIONAR_PROJETO](state, projeto: IProjeto) {
      state.projetos.push(projeto);
    },
    [TIPOS_MUTACOES.ALTERAR_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex((proj) => proj.id === projeto.id);
      state.projetos[index] = projeto;
    },
    [TIPOS_MUTACOES.EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter((proj) => proj.id !== id);
    },

    //mutations de tarefas
    [TIPOS_MUTACOES.DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [TIPOS_MUTACOES.ADICIONAR_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [TIPOS_MUTACOES.REMOVER_TAREFA](state, id: string) {
      state.tarefas = state.tarefas.filter((tar) => tar.id !== id);
    },
    [TIPOS_MUTACOES.ALTERAR_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((tar) => tar.id === tarefa.id);
      state.tarefas[index] = tarefa;
    },

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
  actions: {
    //actions de projetos
    [TIPOS_ACOES.OBTER_PROJETOS]({ commit }) {
      httpAxios
        .get('projetos')
        .then((response) =>
          commit(TIPOS_MUTACOES.DEFINIR_PROJETOS, response.data)
        );
    },
    [TIPOS_ACOES.CADASTRAR_PROJETO](context, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto;

      return httpAxios.post('projetos', projeto);
    },
    [TIPOS_ACOES.ALTERAR_PROJETO](context, projeto: IProjeto) {
      return httpAxios.put(`projetos/${projeto.id}`, projeto);
    },
    [TIPOS_ACOES.REMOVER_PROJETO]({ commit }, id: string) {
      httpAxios.delete(`projetos/${id}`).then(() => {
        commit(TIPOS_MUTACOES.EXCLUIR_PROJETO, id);
      });
    },

    //actions de tarefas
    [TIPOS_ACOES.OBTER_TAREFAS]({ commit }) {
      httpAxios.get('tarefas').then(({ data }) => {
        commit(TIPOS_MUTACOES.DEFINIR_TAREFAS, data);
      });
    },
    [TIPOS_ACOES.CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      tarefa.id = new Date().toISOString();
      return httpAxios
        .post('tarefas', tarefa)
        .then(({ data }) => commit(TIPOS_MUTACOES.ADICIONAR_TAREFA, data));
    },
    [TIPOS_ACOES.REMOVER_TAREFA]({ commit }, id: string) {
      httpAxios.delete(`tarefas/${id}`).then(() => {
        commit(TIPOS_MUTACOES.REMOVER_TAREFA, id);
      });
    },
    [TIPOS_ACOES.ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return httpAxios.put(`tarefas/${tarefa.id}`, tarefa).then(({ data }) => {
        commit(TIPOS_MUTACOES.ALTERAR_TAREFA, data);
      });
    },
  },
});
