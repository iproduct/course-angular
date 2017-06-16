/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Identifiable, IdentityType } from '../shared/shared-types';

export enum License {
  CC0 = 1, CC_BY, CC_BY_SA, CC_BY_NC_SA, GNU_FDL, GSFDL, FreeBSD_DL, OPEN_CONTENT_LICENSE, WTFPL
}

export enum Difficulty {
  BEGINNER = 1, MEDIUM, ADVANCED, PROFESSIONAL
}

export interface IAnswer {
    readonly id: number;
    readonly text: string;
    readonly weight: number;
}

export interface IQuestion {
    readonly id: number;
    readonly text: string;
    readonly hint: string;
    readonly weight: number;
    readonly answers: IAnswer[];
}

export interface ITest extends Identifiable {
    readonly title: string;
    readonly description: string;
    readonly difficulty: Difficulty;
    readonly author: string;
    readonly license: License;
    readonly questions: IQuestion[];
}

export class Answer implements IAnswer {
  constructor (
    public readonly id: number,
    public readonly text: string = '',
    public readonly weight: number = 0) {}
}

export class Question implements IQuestion {
  constructor (
    public readonly id: number,
    public readonly text: string = '',
    public readonly hint: string = '',
    public readonly weight: number = 1,
    public readonly answers: IAnswer[] = []) {}
}

export class Test implements ITest {
  constructor (
    public readonly id: IdentityType = '',
    public readonly title: string = '',
    public readonly description: string = '',
    public readonly difficulty: Difficulty = Difficulty.MEDIUM,
    public readonly author: string = '',
    public readonly license: License = License.CC_BY_SA,
    public readonly questions: IQuestion[] = []) {}
}
