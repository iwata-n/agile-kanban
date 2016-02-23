/// <reference path="../typings/tsd.d.ts" />;
import {Story, StoryManager, Task, Data} from "../src/ts/Model";

import fs = require("fs");
import chai = require("chai");
let expect = chai.expect;

function delete_database() {
  try {
    fs.unlinkSync("story.db");
    fs.unlinkSync("task.db");
  }
  catch (err) {

  }
}

describe("Modelの", () => {

  describe("Taskの", () => {
    beforeEach(() => {
      delete_database();
    });

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
      }, 2000);
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
});