# 快速体验EOS入门合约
本教程主要面向初阶开发人员，目的在于带领大家以最简单的示例合约，通过简单但不失完整的流程，体验整个合约的编译、发布与调用过程，从而让大家从直观角度有个清晰的概念认识。

---- 

## 一、帐户注册
### 1. 生成公私钥地址
在进行帐户注册时，需要事先提供一对公私钥地址，以便在注册帐号时进行绑定使用。可通过[EOS Key Generation](https://nadejde.github.io/eos-token-sale/)网站进行公私钥地址生成。
![](http://cdn.hackdapp.com/2019-03-26-061513.png)
![](http://cdn.hackdapp.com/2019-03-26-061448.png)
### 2. 帐号注册
通过[Jungle2.0 - EOS Test Network Monitor (CryptoLions.io)](http://monitor.jungletestnet.io/#home)网站进行EOS帐户的创建
![](http://cdn.hackdapp.com/2019-03-26-061701.jpg)
点击图中标红**create account**, 在弹出界面中，填写事先生成的公钥地址
![](http://cdn.hackdapp.com/2019-03-26-062433.jpg)
![](http://cdn.hackdapp.com/2019-03-26-063220.jpg)
见上图中，需要填写三个信息，其中account name主要用于填写我们易于记忆的帐户名称，但其帐户名称长度只允许12位长度，且其组成字符也只能从a-z, 1-5以及一个点符号组成。
至于owner public key和 active public key分别对应该帐户owner权限和active权限。如果从安全角度讲，两个权限所对应的公钥地址应该设置成不一样的，这样当active private key丢失的时候，可以使用ower权限对active权限对应的公钥地址进行更换。因为ower和active权限是有层次关系的，只允许低级权限对下次权限进行操作。在不丢失ower私钥的情况下，也可以实现对ower权限地址的更换操作。

点击**create**, 创建成功后，会显示如下信息
![](http://cdn.hackdapp.com/2019-03-26-063306.jpg)

## 二、申领EOS
![](http://cdn.hackdapp.com/2019-03-26-063552.jpg)
在[Jungle2.0 - EOS Test Network Monitor (CryptoLions.io)](http://monitor.jungletestnet.io/#home)页面，点击菜单栏中的**Faucet**按钮，会弹出如下界面
![](http://cdn.hackdapp.com/2019-03-26-063708.jpg)

## 三、查看帐户明细(余额 / RAM / CPU / NET资源)
![](2019-03-26%20at%2014.37.jpg)
在[Jungle2.0 - EOS Test Network Monitor (CryptoLions.io)](http://monitor.jungletestnet.io/#home)页面，点击菜单栏中的**account info**按钮，弹出如下界面：
![](http://cdn.hackdapp.com/2019-03-26-064031.jpg)
填写帐号名称后，点击**get**按钮, 便可以查到该用户的EOS余额及公钥地址信息。

## 四、编译合约
本步骤将使用EOS所提供的cdt开发工具包完成对简单示例合约的编译工作。

1）在本地安装eosio-cpp工具命令
```bash
brew tap eosio/eosio.cdt //增加仓库
brew install eosio.cdt	 //安装工具包
```

注： 可使用**eosin-cpp --help**命令来查看所有参数说明
```bash
> eosio-cpp --help
OVERVIEW: eosio-cpp (Eosio C++ -> WebAssembly compiler)
USAGE: eosio-cpp [options] <input file> ...

OPTIONS:

Generic Options:

  -help                    - Display available options (-help-hidden for more)
  -help-list               - Display list of available options (-help-list-hidden for more)
  -version                 - Display the version of this program

compiler options:

  -C                       - Include comments in preprocessed output
  -CC                      - Include comments from within macros in preprocessed output
```

2）编写简单示例合约(helloworld.cpp)
```bash
#include <eosiolib/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] hello : public contract {
  public:
      using contract::contract;

      [[eosio::action]]
      void hi( name user ) {
         print( "Hello, ", user);
      }
};

EOSIO_DISPATCH(hello, (hi))

```
3）进行合约编译，生成abi合约描述文件及wasm合约文件
```bash
eosio-cpp -abigen 'contracts/hello.cpp' -o 'contracts/hello.wasm' --contract 'hackdappcom1'
```

编译完成后，会生成hello.abi、hello.wasm两个文件。

## 五、购买RAM、CPU、NET资源
### 1. 安装scatter
在chrome浏览器中安装[Chrome 网上应用店 - scatter](https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle?hl=zh-CN)插件

导入私钥地址
![](http://cdn.hackdapp.com/2019-03-26-083240.jpg)![](2019-03-26%20at%2016.34.jpg)![](2019-03-26%20at%2016.35.jpg)

针对测试网绑定身份
![](2019-03-26%20at%2016.36.jpg) ![](http://cdn.hackdapp.com/2019-03-26-083734.jpg) ![](http://cdn.hackdapp.com/2019-03-26-084004.jpg)
### 2. 绑定scatter帐号
访问[内存交易 - 钱包 - EOSX - Fastest EOS Block Explorer](https://jungle.eosx.io/tools/ram/buy?symbol=10)网站，绑定scatter帐号
![](2019-03-26%20at%2016.44.jpg)![](2019-03-26%20at%2016.23.jpg) ![](http://cdn.hackdapp.com/2019-03-26-085148.jpg)

### 3. 购买资源
**购买RAM**
![](http://cdn.hackdapp.com/2019-03-26-085239.jpg)
**购买CPU与NET资源**
![](http://cdn.hackdapp.com/2019-03-26-085429.jpg)

## 六、发布合约
如果你没有事先购买RAM资源，可以会提示以下错误信息
```bash
{
  "code": 500,
  "message": "Internal Service Error",
  "error": {
    "code": 3080001,
    "name": "ram_usage_exceeded",
    "what": "Account using more than allotted RAM usage",
    "details": [
      {
        "message": "account hackdappcom1 has insufficient ram; needs 26318 bytes has 5471 bytes",
        "file": "resource_limits.cpp",
        "line_number": 213,
        "method": "verify_account_ram_usage"
      }
    ]
  }
}
```

为了方便大家的操作，特提供了一个发布合约的示例工程
![](http://cdn.hackdapp.com/2019-03-26-090010.jpg)
1）克隆示例工程: 

```bash
git clone git@github.com:hackdapp/learn_eos.git
```

将之前编写的示例合约，放在工程目录contracts下

2）编辑配置文件**deploy.js**和**package.json**
```bash
//file: deploy.js
const eos = require('./utils/eossdk')({
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
  httpEndpoint: "http://jungle2.cryptolions.io:80",
  keyProvider: "5JxqGao9rzXWBUDnNzALyxaFdmZYXiZ46EzHL4sJkHkryzCFKxu", //可改为自己的私钥地址
  authorization: 'hackdappcom1@active',//可以改为自己的eos帐户
  broadcast: true,
  sign: true
})

const {deployContract} = require('./utils/deploy')

deployContract(eos, { account: "hackdappcom1", contractDir: "./contracts" }).then((result) => {
    console.log(`Deployment successful`, JSON.stringify(result, null , 4))
})
.catch(err => {
    console.error(`Deployment failed`, err)
})
```

同时，还需要再编辑**package.json**
```bash
//package.json
{
  "name": "learn_eos",
  "version": "1.0.0",
  "description": "快速体验EOS入门合约",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "eosio-cpp -abigen 'contracts/hello.cpp' -o 'contracts/hello.wasm' --contract 'hackdappcom1'", //根据自己的情况修改合约名称 --contract '合约帐户名'
    "deploy": "node index.js" 
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/hackdapp/learn_eos.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/hackdapp/learn_eos/issues"
  },
  "homepage": "https://github.com/hackdapp/learn_eos#readme",
  "dependencies": {
    "eosjs": "^16.0.9"
  }
}
```

3）合约发布
```bash
npm run deploy
```

显示**Deployment successful**, 则表示发布合约成功。

## 七、测试合约及合约方法调用
### 编写测试文件index.js
```bash
const eos = require('./utils/eossdk')({
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
  httpEndpoint: "http://jungle2.cryptolions.io:80",
  keyProvider: "5JxqGao9rzXWBUDnNzALyxaFdmZYXiZ46EzHL4sJkHkryzCFKxu",
  authorization: 'hackdappcom1@active',
  broadcast: true,
  sign: true
})

const data = {
	actions: [
		{
	      account: 'hackdappcom1',
	      name: 'hi',
	      authorization: [{
	          actor: 'hackdappcom1',
	          permission: 'active'
	      }],
	      data: {"user": "lisa"}
		}
	]
}

eos.transaction(data).then((result)=>{
    console.log(JSON.stringify(result.processed.action_traces[0].console, null, 4))
}).catch((err)=>{
  console.log(err)
})
```
运行调用命令
```bash
node index.js
```
运行结果如下
```bash
"Hello, 111"

```
---- 
通过本章的学习以及自我动手实践，了解在测试网上如何进行私钥生成以及帐号注册，学会如何使用eosio-cpp命令编译示例合约以及通过脚本进行合约的发布及测试的完整操作流程。

### 测试网帐号

|帐户名			|公钥			|私钥			|
|:---				|:---				|:---				|
| hackdappcom1	| EOS6LTWfM5ffbmjUhvwFnrU5QEBrmkzsRo2eXogr2h9oP8DUuzgAi				| 5JxqGao9rzXWBUDnNzALyxaFdmZYXiZ46EzHL4sJkHkryzCFKxu				|
| hackdappcom2	| EOS6qCqbFLuYK5rGK9LDPzcboLqy4phrUxLXLrhLgXxVBpzLzsJke				| 5Jnw2anG8Zzy6MuCNxvwmaX5Hu4B6de1uzuae5QyRrUFtyfL2Wo				|
| hackdappcom3	| EOS57B3rxRBBUiTyZf9iBxsWyQnvEhq2H95wbBbjdzcLbV1gfJ4zy				| 5Ju2NNc24q3jQ2Yc2JcvwWjtGVeAyuWcNsaNVb37u7cmRW56zgc				|
| hackdappcom4	| EOS7i5Diz2uqXSpvutmV4DftBRrL1XASzxsSdWBGrgzngPoXhT2dk				| 5K6nyWMvpfYnQqLhS545dm53exduJgDBLHMYQ6SCNaPmeHjGZdr				|
| hackdappcom5	| EOS6NcaFvvoekuBjhZLsBVywiMcN7VTVmgvAdA5srgTvQMeDmdiAH				| 5JjN9efKokkgZYno2qjbE9C7WCGbVpPvgNArKDvcjbDic2pRGCS				|

### 参考资料
1. [https://nadejde.github.io/eos-token-sale/](https://nadejde.github.io/eos-token-sale/)
2. [http://monitor.jungletestnet.io/#home](http://monitor.jungletestnet.io/#home)
3. [https://jungle.eosx.io/tools/ram/buy?symbol=10](https://jungle.eosx.io/tools/ram/buy?symbol=10)
4. [https://github.com/hackdapp/learn\_eos](https://github.com/hackdapp/learn_eos)

---- 
> 在教程中如出现错误🐛或不易理解的知识点，欢迎加我微信指正!
> Name: zhangliang | WeChat: rushking2009 | Mail: zhangliang@cldy.org
