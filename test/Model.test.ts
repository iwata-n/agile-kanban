/// <reference path="../typings/tsd.d.ts" />;
import {Story, StoryManager, Task, TaskManager, Data} from "../src/ts/Model";

import Database = require("nedb");
import fs = require("fs");
import chai = require("chai");
let expect = chai.expect;

function delete_database() {
  try {
    fs.unlinkSync("story.db");
  }
  catch (err) {
    // console.error(err);
  }

  try {
    fs.unlinkSync("task.db");
  }
  catch (err) {
    // console.error(err);
  }
}

describe("Modelの", () => {

  describe("Taskの", () => {
    beforeEach(() => {
      delete_database();
    });

    context("データベースにデータが無い状態で", () => {

      it("コンストラクタ", () => {
        let task = new Task();
        let createAt = new Date();
        expect(task.title).equal("no title");
        expect(task.status).equal("todo");
        expect(task.createAt.getFullYear()).be.eql(createAt.getFullYear());
        expect(task.createAt.getMonth()).be.eql(createAt.getMonth());
        expect(task.createAt.getDay()).be.eql(createAt.getDay());
        expect(task.createAt.getHours()).be.eql(createAt.getHours());
        expect(task.createAt.getMinutes()).be.eql(createAt.getMinutes());
        expect(task.createAt.getSeconds()).be.eql(createAt.getSeconds());
      });

      it("要素を更新したら時刻が更新される", (done) => {
        let task = new Task();
        let createAt = new Date();
        setTimeout(() => {
          task.title = "update";
          let updateAt = new Date();
          expect(task.createAt.getFullYear()).be.eql(createAt.getFullYear());
          expect(task.createAt.getMonth()).be.eql(createAt.getMonth());
          expect(task.createAt.getDay()).be.eql(createAt.getDay());
          expect(task.createAt.getHours()).be.eql(createAt.getHours());
          expect(task.createAt.getMinutes()).be.eql(createAt.getMinutes());
          expect(task.createAt.getSeconds()).be.eql(createAt.getSeconds());

          expect(task.updateAt.getFullYear()).be.eql(updateAt.getFullYear());
          expect(task.updateAt.getMonth()).be.eql(updateAt.getMonth());
          expect(task.updateAt.getDay()).be.eql(updateAt.getDay());
          expect(task.updateAt.getHours()).be.eql(updateAt.getHours());
          expect(task.updateAt.getMinutes()).be.eql(updateAt.getMinutes());
          expect(task.updateAt.getSeconds()).be.eql(updateAt.getSeconds());

          done();
        }, 1200);
      });

      it("タイトルを空欄で更新しようとすると更新されない", () => {
        let task = new Task();
        task.title = "";
        expect(task.title).to.equal("no title");
      });

      it("タイトルを更新する", () => {
        let task = new Task();
        task.title = "new task";
        expect(task.title).to.equal("new task");
      });

      it("データベースへ登録", () => {
        let task = new Task();
        return task.submit()
          .then( (newDoc) => {
              expect(newDoc.title).to.equal(task.title);
              expect(newDoc.status).to.equal(task.status);
              expect(newDoc.assign).to.equal(task.assign);
            });
      });
    });

    context("データベースに既にデータがある状態で", () => {
      let task = new Task();
      let db = new Database({filename: "task.db"});

      beforeEach(done => {
        db.loadDatabase((err) => {
          if (err) throw err;
          task.title = "first";
          task.submit()
            .then(() => {done()});
        });
      });

      it ("データベースの上書き", () => {
        task.title = "second";
        task.status = "doing";
        return task.submit()
          .then(newDoc => {
            expect(task._id).to.equal(newDoc._id);
            db.find({}, (err: any, docs: any) => {
              if (err) throw err;
              expect(docs).lengthOf(1);
            });
          });
      });
    });
  });

  describe("Storyの", () => {
    beforeEach(() => {
      delete_database();
    });

    it("コンストラクタ", () => {
      let story = new Story();
      expect(story.title).equal("no title");
      expect(story.status).equal("todo");
      expect(story.task).lengthOf(0);
    });

    it("タスクを追加する", () => {
      let story = new Story();
      let task = new Task("ABCD");
      story.addTask(task);
    });

    it("データベースへ登録", () => {
      let story = new Story();
      return story.submit()
        .then( (newDoc) => {
            expect(newDoc.title).to.equal(story.title);
            expect(newDoc.status).to.equal(story.status);
            expect(newDoc.assign).to.equal(story.assign);
        });
    })
  });

  describe("TaskManagerの", () => {

    beforeEach(() => {
      // delete_database();
      let task1 = new Task();
      task1.title = "one";

      let task2 = new Task();
      task2.title = "two";

      return Promise.all([task1.submit(), task2.submit()]);
    });

    let taskManger = new TaskManager();
    it("検索", () => {
      taskManger.find({})
        .then(docs => {
        });
    });
  });
});