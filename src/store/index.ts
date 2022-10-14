import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import IProjeto from '@/interfaces/IProjeto';
import ITarefa from '@/interfaces/ITarefa';
import { TIPOS_MUTACOES } from './tipos-mutacoes';

interface Estado {
  projetos: IProjeto[];
  tarefas: ITarefa[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: [],
    tarefas: [],
  },
  mutations: {
    [TIPOS_MUTACOES.ADICIONAR_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto;

      state.projetos.push(projeto);
    },
    [TIPOS_MUTACOES.ALTERAR_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex((proj) => proj.id === projeto.id);
      state.projetos[index] = projeto;
    },
    [TIPOS_MUTACOES.EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter((proj) => proj.id !== id);
    },
    [TIPOS_MUTACOES.ADICIONAR_TAREFA](state, tarefa: ITarefa) {
      tarefa.id = new Date().toISOString();
      state.tarefas.push(tarefa);
    },
    [TIPOS_MUTACOES.REMOVER_TAREFA](state, id: string) {
      state.tarefas = state.tarefas.filter((tar) => tar.id !== id);
    },
  },
});
