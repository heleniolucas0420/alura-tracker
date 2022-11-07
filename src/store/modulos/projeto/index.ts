import httpAxios from '@/http';
import IProjeto from '@/interfaces/IProjeto';
import { Estado } from '@/store';
import { TIPOS_ACOES } from '@/store/tipo-acoes';
import { TIPOS_MUTACOES } from '@/store/tipos-mutacoes';
import { Module } from 'vuex';

export interface EstadoProjeto {
  projetos: IProjeto[];
}

export const projeto: Module<EstadoProjeto, Estado> = {
  state: {
    projetos: []
  },
  mutations: {
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
  },
  actions: {
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
  },
};
