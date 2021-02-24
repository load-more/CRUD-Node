var fs = require('fs')
var student = require('./student')

var express = require('express')
var router = express.Router()


router.get('/', (req, res) => {
  /* 
    fs.readFile 的第二个参数是可选的，传入 utf8 就是声明读取文件直接按照 utf-8 编码，
    除此之外，也可以通过 data.toString() 的方式将二进制转换成字符串
  */
  student.find(function (err, students) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('index.html', {
      students: students
    })
  })
})

router.get('/students/new', (req, res) => {
  res.render('new.html')
})

router.post('/students/new', (req, res) => {
  student.save(req.body, function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/')
  })
})

router.get('/students/edit', (req, res) => {
  // 注意 req.query.id 得到的是 string，要转换成 number
  student.findById(parseInt(req.query.id), function(err, data) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('edit.html', {
      students: data
    })
  })
})

router.post('/students/edit', (req, res) => {
  student.updateById(req.body, function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/')
  })
})

router.get('/students/delete', (req, res) => {
  student.deleteById(parseInt(req.query.id), function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/')
  })
})

module.exports = router