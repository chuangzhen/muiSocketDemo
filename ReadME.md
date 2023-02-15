# client 
 
1. 引入客户端socket.io的包,并建立socket连接，获取实例对象

```
    <!-- 以下两种操作相同作用 -->
    
    <!-- 方法1 -->
    const {io} from 'socket.io-client'
    <!-- 客户端与服务端不同源时，客户端需要输入服务端的地址url -->
    cosnt socket  = io(?url)


    <!-- 方法2 -->
    const SocketIO from 'socket.io-client'
    <!-- 客户端与服务端不同源时，客户端需要输入服务端的地址url -->
    const socket = SocketIO.connect(?url)
    
```