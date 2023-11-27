import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Piece } from '../types';

const PIECES_URL = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150'

@Component({
  selector: 'board-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.css'
})
export class CellComponent {
  @Input('index') index!: number
  @Input('piece') piece!: Piece
  @Input('prevMove') prevMove!: number
  @Input('hints') hints!: Array<number>
  @Output() setPrev: EventEmitter<number> = new EventEmitter<number>();
  @Output() movePiece: EventEmitter<number | null> = new EventEmitter<number | null>();

  color: string = ''
  selectedClass: string = ''
  hintClass: string = ''
  pieceURL: string = ''

  changeSelected = () => {
    console.log(this.piece.index)
    console.log(this.hints)
    if(!this.piece || typeof this.piece.index !== 'number') return
    const pieceSelected = this.prevMove >= 0
    const index = this.piece?.index || -1
    if(pieceSelected) this.movePiece.emit(index)
    else if(this.piece.piece) this.setPrev.emit(index)
  }
 
  setSelectedClass = (prevMove: number): string => {
    if(prevMove != this.index) return ''
    return 'selected' 
  }   
  
  ngOnInit() {
    this.selectedClass = this.setSelectedClass(this.prevMove)
    this.pieceURL = `${PIECES_URL}/${this.piece?.piece}.png`
    const fila = Math.floor(this.index / 8)
    const columna = this.index % 8
    const blanca = (fila+columna) % 2 === 0
    this.color = blanca ? 'white' : 'black'
  }

  manageHints(hints:Array<number> = []) {
    if(typeof this.piece.index !== 'number') return
    this.hints = hints
    this.hintClass = hints.includes(this.piece.index) ? 'hint' : ''
    if(this.hintClass.includes('hint')) this.hintClass = !this.piece.piece ? 'hint' : 'hint-capture'
  }

  managePrevMove(prev:number){
    if(typeof prev !== 'number') return
    this.prevMove = prev
    this.pieceURL = `${PIECES_URL}/${this.piece?.piece}.png`
    this.selectedClass = this.setSelectedClass(this.prevMove)
  } 

  ngOnChanges(changes: SimpleChanges) {
    this.managePrevMove(changes['prevMove']?.currentValue)
    this.manageHints(changes['hints']?.currentValue)
  }
}
  