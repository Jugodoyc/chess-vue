import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CellComponent } from './cell/cell.component';
import { Piece } from './types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CellComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  prevMov: number = -1
  board: Array<Piece> = []
  hints: Array<number> = []

  getPrevMove = ():number => this.prevMov

  getMoves = () => {
    this.hints = [0,8,16]
  }
  
  setPrev = (movement: number): void => {
    this.prevMov = movement
    this.getMoves()
  } 

  movePiece = (movement: number | null): void => {
    if(typeof movement != 'number') return
    const goodMove = this.hints.includes(movement)
    const prev = this.prevMov
    this.hints = []
    this.prevMov = -1
    if(!this.prevMov || !goodMove) return
    this.board[movement].piece = this.board[prev].piece
    this.board[prev].piece = null
  }
   
  formatPieceArray = (pieces: Array<string | null>):Array<Piece>  => {
    return pieces.map(v => {return {piece:v}})
  }

  addArrayToBoard = (pieces: Array<string>) => {
    this.board = [...this.board, ...this.formatPieceArray(pieces)]
  }

  ngOnInit(){
    this.addArrayToBoard(['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'])
    this.addArrayToBoard(new Array(8).fill(null).fill('wp'))
    this.addArrayToBoard(new Array(8).fill(null).fill(null))
    this.addArrayToBoard(new Array(8).fill(null).fill(null))
    this.addArrayToBoard(new Array(8).fill(null).fill(null))
    this.addArrayToBoard(new Array(8).fill(null).fill(null))
    this.addArrayToBoard(new Array(8).fill(null).fill('bp'))
    this.addArrayToBoard(['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'])
    this.board = this.board.map((value, index) => { return {piece: value.piece, index} })
  }
}
