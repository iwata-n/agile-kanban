/// <reference path="../../typings/tsd.d.ts" />
/**
 * モデル
 */

"use strict";

import Database = require("nedb");

interface IKey {
  value: string;
}

class Key implements IKey {
  constructor(public value: string) {}
}

interface ITitle {
  value: string;
}

class Title implements ITitle {
  constructor(public value: string) {}
}

interface IStatus {
  value: string;
}

class Status implements IStatus {
  constructor(public value: string) {}
}

interface IAssign {
  value: string;
}

class Assign implements IAssign {
  constructor(public value: string) {}
}

interface ITime {
  createAt: Date;
  updateAt: Date;
}

interface IData {
  submit(fn?: Function): void;
  delete(fn?: Function): void;
}

export class Data implements ITime {
  private _updateAt: Date;
  private _createAt: Date;
  private dbName: string = "database.db";

  constructor() {
    this._createAt = new Date();
    this._updateAt = new Date();
  }

  load(dbName: string): void {
    this.dbName = dbName;
  }

  update() {
    this._updateAt = new Date();
  }

  get updateAt(): Date {
    return this._updateAt;
  }

  get createAt(): Date {
    return this._createAt;
  }

  /**
   * データベースへ反映の実態
   * 継承先では_submitを呼ぶ
   * 外部からはsubmitを呼ぶ
   */
  protected _submit(obj?: any): Promise<any> {
    let db = new Database({filename: this.dbName});
    obj["updateAt"] = this.updateAt;
    obj["createAt"] = this.createAt;
    return new Promise((resolve, reject) => {
      db.loadDatabase((err) => {
        if (err) {
          reject(err);
          return;
        }
        db.insert(obj, (err, newDoc) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(newDoc);
        });
      });
    });
  }

  submit(): Promise<any> {
    return this._submit({});
  }

  /**
   * ストーリーの削除
   */
  delete() {
    throw new ReferenceError("no implemented");
  }
}

interface ITask {
  id: string;
  title: string;
  status: string;
  assign: string;
}

export class Task extends Data implements ITask {
  private _title: Title = new Title("no title");
  private _status: Status = new Status("todo");
  private _assign: Assign = new Assign("");
  private _id: Key = new Key("");

  constructor(id?: string) {
    super();
    this._id.value = id;
    this.load("task.db");
  }

  get id(): string {
    return this._id.value;
  }

  set title(value: string) {
    if (value) {
      this._title.value = value;
      this.update();
    }
  }

  get title(): string {
    return this._title.value;
  }

  set status(value: string) {
    if (value) {
      this._status.value = value;
      this.update();
    }
  }

  get status(): string {
    return this._status.value;
  }

  set assign(value: string) {
    this._assign.value = value;
  }

  get assign(): string {
    return this._assign.value;
  }

  protected _submit(obj: any): Promise<any> {
    obj["title"] = this.title;
    obj["status"] = this.status;
    obj["assign"] = this.assign;
    return super._submit(obj);
  }

  submit(): Promise<ITask> {
    return this._submit({});
  }
}

interface IStory extends ITask {
  task: Array<string>;
}

/**
 * ストーリーを表すModel
 */
export class Story extends Task implements IStory {
  private _task: Array<Task> = [];

  constructor() {
    super();
    // FIXME: TaskでもDBが初期化されて、Storyでもまた初期化されてる
    this.load("story.db");
  }

  /**
   * ストーリーに関連するタスクを追加する
   */
  addTask(task: Task) {
    if (task) {
      this._task.push(task);
      this.update();
    }
  }

  /**
   * ストーリーに関連付けられているタスクを削除する
   */
  removeTask(task: Task) {
    throw new ReferenceError("no implemented");
  }

  get task(): Array<string> {
    return this._task.map((t) => {
      return t.id;
    });
  }

  protected _submit(obj: any): Promise<any> {
    obj["task"] = this.task;
    return super._submit(obj);
  }

  submit(): Promise<IStory> {
    return this._submit({});
  }
}

/**
 * データベースとのやり取り
 * genericsでデータベースから取ってくる型を指定する
 */
export class DataManager<T> {
  private _dbName = "task.db";

  /**
   * クエリで検索
   */
  find(query: Object): Promise<Array<T>> {
    let db = new Database({filename: this._dbName, autoload: true});

    return new Promise<Array<T>>((resolve, reject) => {
      db.find(query, (err: any, docs: Array<T>) => {
        if (err) reject(err);
        resolve(docs);
      });
    });
  }

  /**
   * 全検索
   */
  findAll(): Promise<Array<T>> {
    return this.find({});
  }

  /**
   * タイトルで検索
   */
  findByTitle(value: string): Promise<Array<T>> {
    return this.find({title: value});
  }

  /**
   * idで検索
   */
  findById(value: string): Promise<Array<T>> {
    return this.find({_id: value});
  }

  /**
   * ステータスで検索
   */
  findByState(value: string): Promise<Array<T>> {
    return this.find({status: value});
  }

  /**
   * 担当で検索
   */
  findByAssing(value: string): Promise<Array<T>> {
    return this.find({assign: value});
  }
}

export class TaskManager extends DataManager<Task> {
}

export class StoryManager extends DataManager<Story> {
}
