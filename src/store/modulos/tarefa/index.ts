import httpAxios from '@/http';
import ITarefa from '@/interfaces/ITarefa';
import { Estado } from '@/store';
import { TIPOS_ACOES } from '@/store/tipo-acoes';
import { TIPOS_MUTACOES } from '@/store/tipos-mutacoes';
import { Module } from 'vuex';

export interface EstadoTarefa {
  tarefas: ITarefa[];
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  state: {
    tarefas: [],
  },
  mutations: {
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
  },
  actions: {
    [TIPOS_ACOES.OBTER_TAREFAS]({ commit }, filtro: string) {
      let url = 'tarefas';

      filtro ? (url += `?descricao=${filtro}`) : url;

      httpAxios.get(url).then(({ data }) => {
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
};
