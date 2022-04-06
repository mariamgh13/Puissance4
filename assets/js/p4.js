// Creation de la Classe de Puissance 4
class GreenPuissance4 {

    constructor(selector) {
        this.COL = 7;
        this.LGN = 6;
        this.selector = selector;
        this.players = [
            {
                'color': 'blue',
                'points': 0
            },
            {
                'color': 'green',
                'points': 0
            }
        ]
        this.player = 'blue';

        this.drawGame();
        this.ecoute();
        this.checkWin();
    }

    //Afficher la grille du jeu puissance 4
    drawGame() {
        const $jeu = $(this.selector);

        for (let lgn = 0; lgn < this.LGN; lgn++) {
            const $lgn = $('<div>').addClass('lgn');
            for (let col = 0; col < this.COL; col++) {
                const $col = $('<div>').addClass('col empty').attr("data-col", col).attr("data-lgn", lgn);
                $lgn.append($col);
            }
            $jeu.append($lgn);
        }
    }

    ecoute() {

        const $jeu = $(this.selector);
        const that = this;

        //Chercher la dernière case libre
        function lastCase(col) {
            const $cells = $(`.col[data-col='${col}']`);
            for (let i = $cells.length - 1; i >= 0; i--) {
                const $cell = $($cells[i]);
                if ($cell.hasClass('empty')) {
                    return $cell;
                }
            }
            return null;
        }

        $jeu.on('mouseenter', '.col.empty', function () {
            const $col = $(this).data('col');
            const $last = lastCase($col);
            if ($last != null) {
                $last.addClass(`hover${thcat.player}`);
            }
        });

        $jeu.on('mouseleave', '.col', function () {
            $('.col').removeClass(`hover${that.player}`);
        });

        $jeu.on('click', '.col.empty', function () {
            const col = $(this).data('col');
            const $last = lastCase(col);
            $last.addClass(`${that.player}`).removeClass(`empty hover${that.player}`).data('player', `${that.player}`);

            const winner = that.checkWin($last.data('lgn'), $last.data('col'));

            that.player = (that.player === 'blue') ? 'green' : 'blue';

            if (winner) {
                $('#relancer').css('visibility', 'visible');
                $('#jeu').css('pointer-events', 'none');
                alert("The  " + winner + " wins");
                // Incrementer le score avec boucle jusqu'a tomber sur la bonne personne
                that.players.forEach(element => {
                    if (element.color === winner) {
                        element.points += 1;
                        $(`#defaut${winner} > .points`).html(element.points);
                    }
                });
            }
        })
    }

// Check le gagnant qui a la total superieur ou egale a 4
    checkWin(lgn, col) {
        const that = this;

        function $getCell(i, j) {
            return $(`.col[data-lgn='${i}'][data-col='${j}']`);
        }

        function checkDirection(direction) {
            let total = 0;
            let i = lgn + direction.i;
            let j = col + direction.j;
            let $next = $getCell(i, j);
            while (i >= 0 && i < that.LGN && j >= 0 && j < that.COL && $next.data('player') === that.player) {
                total++;
                i += direction.i;
                j += direction.j;
                $next = $getCell(i, j);
            }
            return total;
        }

        function checkWin(directionA, directionB) {
            const total = 1 + checkDirection(directionA) + checkDirection(directionB);
            if (total >= 4) {
                return that.player;
            } else {
                return null;
            }
        }

        // les directions par les quelles gagnées
        function checkHori() {
            return checkWin({ i: 0, j: -1 }, { i: 0, j: 1 })
        }

        function checkVerti() {
            return checkWin({ i: -1, j: 0 }, { i: 1, j: 0 })
        }

        function checkDiag1() {
            return checkWin({ i: 1, j: 1 }, { i: -1, j: -1 })
        }

        function checkDiag2() {
            return checkWin({ i: 1, j: -1 }, { i: -1, j: 1 })
        }

        return checkHori() || checkVerti() || checkDiag1() || checkDiag2();

    }

}