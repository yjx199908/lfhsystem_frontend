<template>
  <div class="self-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item 
            v-for="item in pathList"
            :key="item.name"
            >
            {{item.name}}
        </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    props:{
        pathList:Array
    }
}
</script>

<style>
    .self-breadcrumb{
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(150,150,150,0.2);
        margin-bottom: 15px;
    }
</style>