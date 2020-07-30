import Vue from 'vue'
import VueRouter from 'vue-router'
import SliceControll from '../views/SliceControll'
import CameraList from '../views/CameraList'
import FinishQueue from '../views/FinishQueue'
import ShowStatus from '../views/ShowStatus'
import WaitQueue from '../views/WaitQueue'
import FailQueue from '../views/FailQueue'
import ConfigFile from '../views/ConfigFile'



// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: "/slice_controll"
  },
  {
    path: '/finish_queue',
    name: 'FinishQueue',
    component: FinishQueue
  },
  {
    path: '/wait_queue',
    name: 'WaitQueue',
    component: WaitQueue
  },
  {
    path: '/fail_queue',
    name: 'FailQueue',
    component: FailQueue
  },
  {
    path: '/show_status',
    name: 'ShowStatus',
    component: ShowStatus
  },
  {
    path: '/config_file',
    name: 'ConfigFile',
    component: ConfigFile
  },
  {
    path: '/slice_controll',
    name: 'SliceControll',
    component: SliceControll
  },
  {
    path: '/camera_list',
    name: "CameraList",
    component: CameraList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
