const path = require('path')

module.exports = [{
  input: 'send2 http://test.com',
  output: [{
    config: {
      url: 'http://test.com',
    },
    callback: undefined,
    env: {},
  }],
}, {
  input: 'send2 --url http://test.com',
  output: [{
    config: {
      url: 'http://test.com',
    },
    callback: undefined,
    env: {},
  }],
}, {
  input: 'send2 http://test-2.com --url http://test.com',
  output: [{
    config: {
      url: 'http://test.com',
    },
    callback: undefined,
    env: {},
  }],
}, {
  input: 'send2 http://test-2.com -K ./test.js',
  output: [{
    config: {
      url: 'http://test-2.com',
    },
    configFileName: path.resolve(process.env.PWD, './test.js'),
    callback: undefined,
    env: {},
  }],
}, {
  input: 'send2 http://test-2.com -K ./test/abc',
  output: [{
    config: {
      url: 'http://test-2.com',
    },
    configFileName: path.resolve(process.env.PWD, './test/abc'),
    callback: undefined,
    env: {},
  }],
}, {
  input: 'send2 http://test-2.com --config ./test/abc',
  output: [{
    config: {
      url: 'http://test-2.com',
    },
    configFileName: path.resolve(process.env.PWD, './test/abc'),
    callback: undefined,
    env: {},
  }],
}, {
  input: 'send2 -X POST',
  output: [{
    config: {
      method: 'POST',
    },
    callback: undefined,
    env: {},
  }],
}, {
  input: 'send2 --method POST',
  output: [{
    config: {
      method: 'POST',
    },
    callback: undefined,
    env: {},
  }],
}, {
  input: 'send2 --request POST',
  output: [{
    config: {
      method: 'POST',
    },
    callback: undefined,
    env: {},
  }],
}, {
  input: 'send2 --callback "test"',
  output: [{
    config: {},
    callback: 'test',
    env: {},
  }],
}, {
  input: 'send2 --callback "function (res) { return res.data }"',
  output: [{
    config: {},
    callback: 'function (res) { return res.data }',
    env: {},
  }],
}, {
  input: 'send2 --data "data"',
  output: [{
    config: {
      data: 'data',
    },
    callback: undefined,
    env: {},
  }],
}, {
  input: 'send2 --data "10"',
  output: [{
    config: {
      data: 10,
    },
    callback: undefined,
    env: {},
  }],
}, {
  input: 'send2 --data "{\\"a\\": 10, \\"b\\": 20}"',
  output: [{
    config: {
      data: {a: 10, b: 20},
    },
    callback: undefined,
    env: {},
  }],
}, {
  input: 'send2 --data "{\\"a\\": 10, \\"b\\": 20}" --data "c: 30" --data "d:40"',
  output: [{
    config: {
      data: {a: 10, b: 20, c: 30, d: 40},
    },
    callback: undefined,
    env: {},
  }],
}, {
  input: 'send2 -d "data"',
  output: [{
    config: {
      data: 'data',
    },
    callback: undefined,
    env: {},
  }],
}, {
  input: 'send2 -d "10"',
  output: [{
    config: {
      data: 10,
    },
    callback: undefined,
    env: {},
  }],
}, {
  input: 'send2 -d "{\\"a\\": 10, \\"b\\": 20}"',
  output: [{
    config: {
      data: {a: 10, b: 20},
    },
    callback: undefined,
    env: {},
  }],
}, {
  input: 'send2 --header "User-Agent:Mozilla/5.0"',
  output: [{
    config: {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    },
    callback: undefined,
    env: {},
  }],
}, {
  input: 'send2 --header "User-Agent:Mozilla/5.0" -H "Accept:application/json, text/plain, */*"',
  output: [{
    config: {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json, text/plain, */*',
      }
    },
    callback: undefined,
    env: {},
  }],
}, {
  input: 'send2 -H "User-Agent:Mozilla/5.0" -H "Accept:application/json, text/plain, */*" -H "Cookie:uid=123456"',
  output: [{
    config: {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json, text/plain, */*',
        'Cookie': 'uid=123456',
      }
    },
    callback: undefined,
    env: {},
  }],
}, {
  input: 'send2 --env "a:10" --env "b:{\\"test\\": \\"abc\\"}" --env "c: \\"def\\""',
  output: [{
    config: {},
    callback: undefined,
    env: {
      a: 10,
      b: {
        test: 'abc',
      },
      c: 'def',
    },
  }],
}]
