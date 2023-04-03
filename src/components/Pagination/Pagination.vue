<template>
    <div class="pagination">
      <h1>{{ startAndEnd }}</h1>
      <button @click="$emit('currentPage',pageNo - 1)" :disabled="pageNo==1">上一页</button>
      <button v-if="startAndEnd.start>1" @click="$emit('currentPage',1)">1</button>
      <button v-if="startAndEnd.start>2">...</button>
  
      <!-- 中间连续页码的地方:v-for、数组、对象、数字、字符串 -->
      <template v-for="page in startAndEnd.end" :key="page">
        <button v-if="page >= startAndEnd.start" :class="{active:pageNo==page}" @click="$emit('currentPage',page)">{{ page }}</button>
      </template>
  
      <button v-if="startAndEnd.end<totalPage-1">...</button>
      <button  v-if="startAndEnd.end<totalPage" @click="$emit('currentPage',totalPage)">{{ totalPage }}</button>
  
      <button  @click="$emit('currentPage',pageNo + 1)" :disabled="pageNo==totalPage">下一页</button>
  
      <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "Pagination",
    props: ["total", "pageSize", "pageNo", "pageCount"],
    computed: {
      //分页器一共多少页【总条数/每页展示条数】
      totalPage() {
        //向上取整数
        return Math.ceil(this.total / this.pageSize);
      },
      //底下的代码是整个分页器最重要的地方[算出连续五个数字、开头、结尾]
      startAndEnd() {
        //算出连续页码:开始与结束这两个数字
        let start = 0,
          end = 0;
        const { totalPage, pageCount, pageNo } = this;
        //特殊情况:总共页数小于连续页码数
        if (totalPage < pageCount) {
          start = 1;
          end = totalPage;
        } else {
          //正常情况：分页器总页数大于连续页码数
          start = pageNo - parseInt(pageCount / 2);
          end = pageNo + parseInt(pageCount / 2);
          //约束start|end在合理范围之内
          //约束头部
          if (start < 1) {
            start = 1;
            end = pageCount;
          }
          //约束尾部
          if (end > totalPage) {
            end = totalPage;
            start = totalPage - pageCount + 1;
          }
        }
        return { start, end };
      },
    },
  };
  </script>
  
  <style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;
  
      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }
  
      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
  </style>