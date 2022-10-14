import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import TarefasView from '../views/TarefasView.vue';
import ProjetosView from '../views/ProjetosView.vue';
import Formulario from '../views/projetos/Formulario.vue';
import Lista from '../views/projetos/Lista.vue';

const rotas: RouteRecordRaw[] = [{
  path: '/',
  name: 'Tarefas',
  component: TarefasView
}, {
  path: '/projetos',
  component: ProjetosView,
  children: [
    {
      path: '',
      name: 'Projetos',
      component: Lista
    },
    {
      path: 'novo',
      name: 'Novo projeto',
      component: Formulario
    },
    {
      path: ':id',
      name: 'Editar projeto',
      component: Formulario,
      props: true
    },
  ]
}, 
];

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default roteador;