/**
 * page 层公用 mixin
 */
import wepy from 'wepy';
import deepClone from '../utils/deep-clone';

export default class extends wepy.mixin {

  /**
   * 重置数据
   * @param {Array} expect 排除重置数据
   */
  resetData(initData, expect) {
    if (!Array.isArray(expect)) {
      expect = [];
    }

    Object.keys(this.data).forEach((key) => {
      if (expect.indexOf(key) === -1) {
        this[key] = deepClone(initData[key]);
      }
    });

    this.$apply();
  }

  updateData(data = {}) {
    this.staticUpdateData(data);

    this.$apply();
  }

  staticUpdateData(data = {}) {
    for (let key in data) {
      this[key] = data[key];
    }
  }

  /**
   * 重写导航
   * @param {*} params
   */
  navigateTo(...params) {
    let len = getCurrentPages().length;

    if (len < 5) {
      this.$navigate(...params);
    } else {
      this.$redirect(...params);
    }
  }

  /**
   * 错误提示
   * @param {*} params
   */
  showWarmToast (params) {
    let options = {
      image: '/images/warm-icon.png'
    };

    if (typeof params === 'object') {
      options = Object.assign(options, params);
    } else if (typeof params === 'string') {
      options.title = params;
    }

    wepy.showToast(options);
  }

  showSuccess (params) {
    let options = {
      icon: 'success'
    };

    if (typeof params === 'object') {
      options = Object.assign(options, params);
    } else {
      options.title = params;
    }

    wepy.showToast(options);
  }
}
