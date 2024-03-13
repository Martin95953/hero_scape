import {movement_service} from "@/services/MovementService"
export class AStar {
    constructor(board) {
        this.board = board
        this.openList = []
        this.closedList = []
    }

    initNode(position, parent = null) {
        return {
            position,
            parent,
            g: 0, // Costo del camino desde el inicio hasta este nodo
            h: 0, // Heurística
            f: 0, // Costo total (g + h)
        }
    }

    heuristic(position, end) {
        return Math.abs(position.row - end.row) + Math.abs(position.col - end.col)
    }

    findPath(start, end) {
        let startNode = this.initNode(start)
        let endNode = this.initNode(end)
        this.openList.push(startNode)

        while (this.openList.length > 0) {
            let current = this.openList.sort((a, b) => a.f - b.f).shift()
            this.closedList.push(current)


            if (current.position.row === endNode.position.row && current.position.col === endNode.position.col) {
                let path = [];
                let temp = current;
                while (temp != null) {
                    path.push(temp.position);
                    temp = temp.parent;
                }
                return path.reverse();
            }


            let neighbors = [
                { row: current.position.row + 1, col: current.position.col },
                { row: current.position.row - 1, col: current.position.col },
                { row: current.position.row, col: current.position.col + 1 },
                { row: current.position.row, col: current.position.col - 1 },
            ]

            for (let next of neighbors) {

                if (next.row >= 0 && next.row < this.board.length && next.col >= 0 && next.col < this.board[0].length && movement_service.WALKABLE_TILES.includes(this.board[next.row][next.col])) {
                    if (this.closedList.some(node => node.position.row === next.row && node.position.col === next.col)) {
                        continue
                    }

                    let nextNode = this.initNode(next, current)
                    nextNode.g = current.g + 1
                    nextNode.h = this.heuristic(nextNode.position, end)
                    nextNode.f = nextNode.g + nextNode.h

                    if (!this.openList.find(oNode => oNode.position.row === nextNode.position.row && oNode.position.col === nextNode.position.col && oNode.f <= nextNode.f)) {
                        this.openList.push(nextNode)
                    }
                }
            }
        }

        return []
    }
}