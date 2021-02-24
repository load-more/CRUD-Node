var fs = require('fs')
var dbPath = './db.json'

// 获取所有学生信息
exports.find = function(callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {  // 如果出错，回调错误
      return callback(err)
    }
    callback(null, JSON.parse(data).students) // 获取成功，回调null，并传递获得的数据
  })
}

// 根据id获取学生信息
exports.findById = function(id, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {  // 如果出错，回调错误
      return callback(err)
    }
    // 通过find方法，查找对应的数据
    var students = JSON.parse(data).students
    var res = students.find((item) => {
      return item.id === id
    })
    // 获取成功，回调null，并传递获得的数据
    callback(null, res)
  })
}

// 保存数据
exports.save = function(stu, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students

    // 给当前id+1，并赋给最新的数据
    stu.id = students[students.length - 1].id + 1
    students.push(stu)
    // 将json对象转换成字符串，写入文件中
    let res = JSON.stringify({students: students})
    fs.writeFile(dbPath, res, function(err) {
      if (err) {
        return callback(err)
      }
      // 成功，回调null
      callback(null)
    })
  })
}

// 通过id更新数据
exports.updateById = function(req, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students

    let findItem = students.find((item) => {
      return item.id === parseInt(req.id)
    })

    for (i in findItem) {  // 改变find获得的对象，会影响到原数组
      if (i !== 'id'){  // 不要给id重新赋值，否则id会变为字符串
        findItem[i] = req[i]
      }
    }

    let res = JSON.stringify({students: students})
    fs.writeFile(dbPath, res, function(err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

// 根据id删除数据
exports.deleteById = function(id, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }

    let students = JSON.parse(data).students
    let index = students.findIndex((item) => {
      return item.id === id
    })

    // splice会影响到原数组
    students.splice(index, 1)

    let res = JSON.stringify({students: students})
    fs.writeFile(dbPath, res, function(err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}