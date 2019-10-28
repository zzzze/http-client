const path = require('path')

module.exports = [{
  input: 'send2 http://test.com',
  output: [{
    url: 'http://test.com',
  }, undefined, {
    callback: undefined,
    env: undefined,
    returnConfigs: undefined,
    jsonString: undefined,
  }],
}, {
  input: 'send2 --url http://test.com',
  output: [{
    url: 'http://test.com',
  }, undefined, {
    callback: undefined,
    env: undefined,
    returnConfigs: undefined,
    jsonString: undefined,
  }],
}, {
  input: 'send2 http://test-2.com --url http://test.com',
  output: [{
    url: 'http://test.com',
  }, undefined, {
    callback: undefined,
    env: undefined,
    returnConfigs: undefined,
    jsonString: undefined,
  }],
}, {
  input: 'send2 http://test-2.com -K ./test.js',
  output: [{
    url: 'http://test-2.com',
  }, path.resolve(process.env.PWD, './test.js'), {
    callback: undefined,
    env: undefined,
    returnConfigs: undefined,
    jsonString: undefined,
  }],
}, {
  input: 'send2 http://test-2.com -K ./test/abc',
  output: [{
    url: 'http://test-2.com',
  }, path.resolve(process.env.PWD, './test/abc'), {
    callback: undefined,
    env: undefined,
    returnConfigs: undefined,
    jsonString: undefined,
  }],
}, {
  input: 'send2 http://test-2.com --config ./test/abc',
  output: [{
    url: 'http://test-2.com',
  }, path.resolve(process.env.PWD, './test/abc'), {
    callback: undefined,
    env: undefined,
    returnConfigs: undefined,
    jsonString: undefined,
  }],
}, {
  input: 'send2 -X POST',
  output: [{
    method: 'POST',
  }, undefined, {
    callback: undefined,
    env: undefined,
    returnConfigs: undefined,
    jsonString: undefined,
  }],
}, {
  input: 'send2 --method POST',
  output: [{
    method: 'POST',
  }, undefined, {
    callback: undefined,
    env: undefined,
    returnConfigs: undefined,
    jsonString: undefined,
  }],
}, {
  input: 'send2 --request POST',
  output: [{
    method: 'POST',
  }, undefined, {
    callback: undefined,
    env: undefined,
    returnConfigs: undefined,
    jsonString: undefined,
  }],
}, {
  input: 'send2 --callback "test"',
  output: [{}, undefined, {
    callback: 'test',
    env: undefined,
    returnConfigs: undefined,
    jsonString: undefined,
  }],
}, {
  input: 'send2 --callback "function (res) { return res.data }"',
  output: [{}, undefined, {
    callback: 'function (res) { return res.data }',
    env: undefined,
    returnConfigs: undefined,
    jsonString: undefined,
  }],
}, {
  input: 'send2 --data "data"',
  output: [{
    data: 'data',
  }, undefined, {
    callback: undefined,
    env: undefined,
    returnConfigs: undefined,
    jsonString: undefined,
  }],
}, {
  input: 'send2 --data "10"',
  output: [{
    data: 10,
  }, undefined, {
    callback: undefined,
    env: undefined,
    returnConfigs: undefined,
    jsonString: undefined,
  }],
}, {
  input: 'send2 --data "{\\"a\\": 10, \\"b\\": 20}"',
  output: [{
    data: {a: 10, b: 20},
  }, undefined, {
    callback: undefined,
    env: undefined,
    returnConfigs: undefined,
    jsonString: undefined,
  }],
}, {
  input: 'send2 -d "data"',
  output: [{
    data: 'data',
  }, undefined, {
    callback: undefined,
    env: undefined,
    returnConfigs: undefined,
    jsonString: undefined,
  }],
}, {
  input: 'send2 -d "10"',
  output: [{
    data: 10,
  }, undefined, {
    callback: undefined,
    env: undefined,
    returnConfigs: undefined,
    jsonString: undefined,
  }],
}, {
  input: 'send2 -d "{\\"a\\": 10, \\"b\\": 20}"',
  output: [{
    data: {a: 10, b: 20},
  }, undefined, {
    callback: undefined,
    env: undefined,
    returnConfigs: undefined,
    jsonString: undefined,
  }],
}]
