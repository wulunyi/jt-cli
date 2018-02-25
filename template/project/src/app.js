import wepy from 'wepy';
import 'wepy-async-function';
import 'promise-polyfill';
import initGlobalData from './globaldata.js';
// import _ from 'lodash';

export default class extends wepy.app {
  config = {
    pages: [
      'pages/index/index'
      // path
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#FF835A',
      navigationBarTitleText: 'template',
      navigationBarTextStyle: '#fff',
      backgroundColor: '#f4f4f4'
    },
    // tabBar: {
    //   backgroundColor: '#ffffff',
    //   selectedColor: '#FF835A',
    //   color: '#5D5D5D',
    //   borderStyle: 'white',
    //   list: [
    //     // {
    //     //   'pagePath': 'pages/index/index',
    //     //   'text': '首页',
    //     //   'iconPath': 'images/tab/tab_home@2x.png',
    //     //   'selectedIconPath': 'images/tab/tab_hover_home@2x.png'
    //     // }
    //   ]
    // }
  }

  globalData = initGlobalData;

  constructor () {
    super();
    this.use('requestfix');
    this.use('promisify');

    // 网络请求拦截器
    this.intercept('request', {
      config (p) {
        return p;
      },

      success (p) {
        return p;
      },

      fail (p) {
        return p;
      },

      complete (p) {
        return p;
      }
    });
  }

  onLaunch({path, query, scene}) {
  }
}
