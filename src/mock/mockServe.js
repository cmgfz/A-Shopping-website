//引入mockjs插件开始模拟数据
import Mock from 'mockjs';
//引入数据：JSON数据格式数据
//比如:图片资源、JSON资源【里面不能书写export关键字】，这些资源默认对外暴露【默认暴露】
import banner from './banner.json';
import floor from './floor.json';

//接口:相当于nodejs里面中间件
//第一个参数：接口的地址 第二个参数:向这个接口发请求获取到的数据 
//Mock插件：中间件默认是GET请求
Mock.mock("/mock/banner", { code: 200, data: banner });
//Mock插件：中间件默认是GET请求
Mock.mock('/mock/floor', { code: 200, data: floor });

