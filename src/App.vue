<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
  .fix-page{
      width:100vw;
      height:100vh;
      position: absolute;
      top:0;
      left:0;
      z-index:0;
  }

  .content-page{
      width:100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
  }

  ::-webkit-scrollbar{
    width:5px;
    height:5px;
    /**/
  }
  ::-webkit-scrollbar-track{
    background: rgb(239, 239, 239);
    border-radius:2px;
  }
  ::-webkit-scrollbar-thumb{
    background: #bfbfbf;
    border-radius:10px;
  }
  ::-webkit-scrollbar-thumb:hover{
    background: #333;
  }
  ::-webkit-scrollbar-corner{
    background: #179a16;
  }

  @keyframes dialogShow{
    0%{
      transform: translateY(100px);
      opacity: 0;
    }

    100%{
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
