<template>
  <div class="m-validator" ref="mynxValidator">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
  import { debounce } from 'lodash-es';
  import Schema, { type ValidateError } from 'async-validator';
  import { isType } from 'mynx-utils';

  // 禁用 async-validator 的警告
  Schema.warning = function () {};

  // 定义 Props 接口
  interface Props {
    mode?: Record<string, any> | any[];
    rules?: Record<string, any>;
    showErrorMsgTip?: boolean;
  }

  // 定义验证结果接口
  interface ValidateResult {
    flag: boolean;
    errors: ValidateError[] | null;
    fields: any | null;
    fieldKeys: string[];
  }

  // 定义 Props
  const props = withDefaults(defineProps<Props>(), {
    mode: () => ({}),
    rules: () => ({}),
    showErrorMsgTip: true,
  });

  // 定义 Emits（如果需要的话）
  // const emit = defineEmits<{}>()

  // 响应式数据
  const mynxValidator = ref<HTMLElement>();
  const validator = ref<Schema>();
  const oldPathValue = ref<Record<string, any>>();
  const validatePropNodeValueObj = ref<Record<string, HTMLElement[]>>({});
  const needReload = ref(false);

  // 存储事件监听器引用，用于组件卸载时清理
  let mousedownHandler: ((event: Event) => void) | null = null;

  // 防抖函数
  const changeModeData_debounce = debounce(changeModeData, 300);

  // 计算属性
  const inner_mode = computed(() => ({ mode: props.mode }));

  const inner_rules = computed(() => {
    const type = isType(props.mode, 'Array') ? 'array' : 'object';
    let _rules = {
      mode: {
        require: true,
        type,
      } as any,
    };

    if (type === 'array') {
      _rules.mode = { ..._rules.mode, ...props.rules };
    } else {
      _rules.mode.fields = props.rules;
    }

    return _rules;
  });

  // 监听器
  watch(
    () => props.mode,
    () => {
      changeModeData_debounce();
    },
    {
      deep: true,
      immediate: true,
    },
  );

  watch(
    inner_rules,
    (rules) => {
      if (isType(rules, 'Object')) {
        validator.value = new Schema(rules);
      }
    },
    {
      deep: true,
      immediate: true,
    },
  );

  // 方法
  function validate(showMessage = false): ValidateResult {
    // 清除class
    clearValidate();
    setValidatePropNodeValueObj();
    const { flag, errors, fields, fieldKeys } = getValidate();
    if (!flag) seErrorView(fieldKeys, errors, showMessage);
    return {
      flag,
      errors,
      fields,
      fieldKeys,
    };
  }

  function changeModeData() {
    if (!props.mode || !(props.mode.length || Object.keys(props.mode).length)) return;

    if (!isType(props.mode, ['Object', 'Array'])) {
      console.error('m-validator 传入的mode必须是对象或数组');
      return;
    }

    if (!oldPathValue.value) {
      oldPathValue.value = getPathValue(props.mode);
      nextTick(() => {
        setValidatePropNodeValueObj();
      });
      return;
    }

    const newPathValue = getPathValue(props.mode);
    const oldKeys = Object.keys(oldPathValue.value);
    const newKeys = Object.keys(newPathValue);
    const newObj: string[] = [];
    const changeValueObj: string[] = [];
    const deleteObj: string[] = [];

    // 数据新增
    newKeys.forEach((key) => {
      if (!oldKeys.includes(key)) {
        newObj.push(key);
      } else {
        if (newPathValue[key] !== oldPathValue.value![key]) {
          changeValueObj.push(key);
        }
      }
    });

    // 数据删除
    oldKeys.forEach((key) => {
      if (!newKeys.includes(key)) {
        deleteObj.push(key);
      }
    });

    oldPathValue.value = newPathValue;

    // 数据新增删除，重新获取dom,needReload外部控制重载，用于数组元素交换位置的视图交互
    if (newObj.length || deleteObj.length || needReload.value) {
      setValidatePropNodeValueObj();
      clearValidate();
      needReload.value = false;
      return;
    }

    // 数据改变
    if (changeValueObj.length) {
      const { fieldKeys, errors } = getValidate();
      changeValueObj.forEach((key) => {
        if (fieldKeys.includes(key)) {
          seErrorView(
            [key],
            errors!.filter((e: any) => e.field === 'mode.' + key),
          );
        } else {
          removeErrorView([key]);
        }
      });
    }
  }

  function seErrorView(keys: string[], errors: ValidateError[] | null, showErrorMsg = false) {
    if (!errors) return;

    keys.forEach((key) => {
      validatePropNodeValueObj.value[key]?.forEach((node) => {
        if (!node?.classList?.contains('m-validator-error-element')) {
          node?.classList.add('m-validator-error-element');
        }
        createErrorTipView(
          node,
          errors.filter((e) => e.field === 'mode.' + key),
        );
      });
    });

    if (showErrorMsg && errors.length > 0) {
      // 这里需要根据您使用的UI库来调整，比如 ElMessage.error
      console.error(errors[0].message);
    }
  }

  /**
   * 添加错误视图，以容器的方式嵌入
   */
  function createErrorTipView(node: HTMLElement, errors: any[]) {
    if (!props.showErrorMsgTip || !node || !errors || !errors.length) return;

    const parentNode = node.parentNode as HTMLElement;
    // 判断当前node的父节点是否已经在error-container中
    if (parentNode?.classList?.contains('m-validator-error-container')) return;

    const currentActiveNode = document.activeElement as HTMLInputElement;

    // m-validator-error-tip
    const divError = document.createElement('div');
    divError.classList.add('m-validator-error-tip');
    divError.innerHTML = errors[0].message;

    // error-container
    const divContainer = document.createElement('div');
    divContainer.classList.add('m-validator-error-container');
    parentNode.replaceChild(divContainer, node);
    divContainer.appendChild(node);
    divContainer.appendChild(divError);

    // 恢复焦点
    currentActiveNode?.focus?.();
    currentActiveNode?.setSelectionRange?.(currentActiveNode.value.length, currentActiveNode.value.length);
  }

  function removeErrorTipView(nodes: HTMLElement[]) {
    if (!isType(nodes, 'Array')) return;

    nodes.forEach((node) => {
      if (!node) return;

      const parentNode = node.parentNode as HTMLElement;
      const currentActiveNode = document.activeElement as HTMLInputElement;

      if (parentNode?.classList?.contains('m-validator-error-container')) {
        parentNode.parentNode!.replaceChild(node, parentNode);
        // 恢复焦点
        currentActiveNode?.focus?.();
        currentActiveNode?.setSelectionRange?.(currentActiveNode.value.length, currentActiveNode.value.length);
      }
    });
  }

  function removeErrorView(keys: string[]) {
    keys.forEach((key) => {
      validatePropNodeValueObj.value[key]?.forEach((node) => node?.classList.remove('m-validator-error-element'));
      removeErrorTipView(validatePropNodeValueObj.value[key] || []);
    });

    // 这里需要根据您使用的UI库来调整
    // this.$message.close && this.$message.close()
  }

  function getPathValue(source: any, prix_path = ''): Record<string, any> {
    const result: Record<string, any> = {};

    function fetchPathValue(obj: any, receiveObj: Record<string, any>, path = '') {
      if (Array.isArray(obj)) {
        const _obj = obj.reduce(
          (o, item, index) => {
            o[index] = item;
            return o;
          },
          {} as Record<string, any>,
        );

        Object.keys(_obj).forEach((key) => {
          fetchPathValue(_obj[key], receiveObj, path ? path + '.' + key : key);
        });
      } else {
        if (Object.prototype.toString.call(obj) === '[object Object]') {
          Object.keys(obj).forEach((key) => {
            fetchPathValue(obj[key], receiveObj, path ? path + '.' + key : key);
          });
        } else {
          receiveObj[path] = obj;
        }
      }
    }

    fetchPathValue(source, result, prix_path);
    return result;
  }

  function getValidate(): ValidateResult {
    // flag, errors, fields, fieldKeys
    let res: ValidateResult = {
      flag: true, // 结果标记
      errors: null, // 错误集
      fields: null, // 错误对应的属性集
      fieldKeys: [], // 错误对应的属性集key
    };

    if (isType(props.mode, ['Object', 'Array']) && validator.value) {
      validator.value.validate(inner_mode.value, (errors: ValidateError[] | null, fields: any) => {
        if (errors && fields) {
          res = {
            flag: false,
            errors,
            fields,
            fieldKeys: Object.keys(fields).map((field) => field.split('mode.')[1]),
          };
        }
      });
    }

    return res;
  }

  function clearValidate() {
    removeErrorView(Object.keys(validatePropNodeValueObj.value));
  }

  function reload() {
    needReload.value = true;
  }

  function setValidatePropNodeValueObj() {
    const result: Record<string, HTMLElement[]> = {};
    const node = mynxValidator.value;

    function getValidatePropNode(nodeList: NodeList, obj: Record<string, HTMLElement[]>) {
      for (let i = 0, len = nodeList.length; i < len; i++) {
        const el = nodeList[i] as HTMLElement;
        if (!el) return;

        // 排除嵌套的m-validator组件
        if (el.classList?.contains('m-validator')) continue;

        if (el.getAttributeNode?.('validate-prop')?.value) {
          const propValue = el.getAttributeNode('validate-prop')!.value;
          if (!obj[propValue]) obj[propValue] = [];
          obj[propValue].push(el);
        }

        if (el?.childNodes && el?.childNodes.length) {
          getValidatePropNode(el.childNodes, obj);
        }
      }
    }

    if (node?.childNodes) {
      getValidatePropNode(node.childNodes, result);
    }
    validatePropNodeValueObj.value = result;
  }

  function handlerMouseClick() {
    // 给予获取当前焦点的控件，并添加失焦事件
    mousedownHandler = () => {
      const target = document.activeElement as HTMLElement;
      const rootNode = mynxValidator.value;

      if (!target || !rootNode?.contains(target)) return;

      const nodeList = Object.keys(validatePropNodeValueObj.value)
        .map((key) => validatePropNodeValueObj.value[key])
        .reduce((arr, _arr) => {
          arr = [...arr, ..._arr];
          return arr;
        }, [] as HTMLElement[]);

      for (let i = 0, len = nodeList.length; i < len; i++) {
        const node = nodeList[i];
        if (node.contains(target)) {
          (target as any).onblur = () => {
            setTimeout(() => {
              const key = node?.getAttributeNode?.('validate-prop')?.value;
              if (!key) return;

              const { fieldKeys, errors } = getValidate();
              if (fieldKeys.includes(key)) {
                seErrorView(
                  [key],
                  errors!.filter((e: any) => e.field === 'mode.' + key),
                );
              }
            }, 300);
          };
        }
      }
    };

    // 存储事件监听器引用
    document.addEventListener('mousedown', mousedownHandler);
  }

  /**
   * 清理事件监听器
   */
  function cleanupEventListeners() {
    if (mousedownHandler) {
      document.removeEventListener('mousedown', mousedownHandler);
      mousedownHandler = null;
    }
  }

  // 暴露方法给父组件使用
  defineExpose({
    validate,
    clearValidate,
    reload,
  });

  // 生命周期
  onMounted(() => {
    handlerMouseClick();
  });

  onUnmounted(() => {
    cleanupEventListeners();
  });
</script>

<style lang="scss" scoped>
  :deep(.m-validator-error-container) {
    & + .el-input__suffix {
      // 当显示错误视图是，防止图标错位
      height: auto;
    }
    .m-validator-error-tip {
      color: red;
      text-align: left;
    }
  }

  :deep(.m-validator-error-element) {
    border: 1px solid red !important;
  }
</style>
