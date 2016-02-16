var express = require('express')
var router = express.Router()

// Todo データベースから読み出す
const data_storys = [
  {
    id: 0,
    title: 'Story 1',
    tasks: [
      {
        id: 0,
        title: 'Task 1-1',
        description: 'Description...',
        assign: 'Naoki Iwata',
        state: 'todo'
      },
      {
        id: 1,
        title: 'Task 1-2',
        description: 'Description...',
        assign: 'Naoki Iwata',
        state: 'doing'
      },
      {
        id: 2,
        title: 'Task 1-3',
        description: 'Description...',
        assign: 'Naoki Iwata',
        state: 'done'
      }
    ]
  },
  {
    id: 1,
    title: 'Story 2',
    tasks: [
      {
        id: 3,
        title: 'Task 2-1',
        description: 'Description...',
        assign: 'Naoki Iwata',
        state: 'todo'
      },
      {
        id: 4,
        title: 'Task 2-2',
        description: 'Description...',
        assign: 'Naoki Iwata',
        state: 'todo'
      },
      {
        id: 5,
        title: 'Task 2-3',
        description: 'Description...',
        assign: 'Naoki Iwata',
        state: 'done'
      }
    ]
  },
  {
    id: 2,
    title: 'Story 3',
    tasks: [
      {
        id: 6,
        title: 'Task 3-1',
        description: 'Description...',
        assign: 'Naoki Iwata',
        state: 'doing'
      },
      {
        id: 7,
        title: 'Task 3-2',
        description: 'Description...',
        assign: 'Naoki Iwata',
        state: 'doing'
      },
      {
        id: 8,
        title: 'Task 3-3',
        description: 'Description...',
        assign: 'Naoki Iwata',
        state: 'doing'
      }
    ]
  }
]

router.get('/story', (req, res, next) => {
  const story_list = data_storys.map((story) => {
    return (
      {id: story.id, title: story.title}
    )
  })
  res.json({result: 'ok', message: story_list})
})

router.get('/story/:id', (req, res, next) => {
  var story_list = []
  for (var i = 0, len = data_storys.length; i <= len; i++) {
    var story = data_storys[i]
    if (story.id === parseInt(req.params.id)) {
      story_list = story.tasks
      res.json({result: 'ok', message: story_list})
      return
    }
  }

  res.json({result: 'fail', message: 'story id #' + req.params.id + ' not found'})
})

module.exports = router
