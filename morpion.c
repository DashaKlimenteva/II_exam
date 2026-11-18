#include <stdio.h>

int main() {
    int c;
    // Affichage de la grille vide
    for (int i = 0; i < 19; i++) {
        for (int j = 0; j < 19; j++) {
            if (i == 0 || i == 6 || i == 12 || j == 6 || j == 12 || i == 18 || j == 0 || j == 18) {
                printf("#");
                if (j == 18) {
                    printf("\n");
                }
            } else {
                printf(" ");
            }
        }
    }
    // Initialisation : 0 = case vide, 1 = croix, 2 = rond
    int res[3][3];
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            res[i][j] = 0;
        }
    }
    // Neuf coups au maximum
    for (int i = 0; i < 9; i++) {
        int a = 3;
        int b = 3;
        // Saisie et verification des coordonnees
        printf("A vous de jouer, joueur numero %d\n", i % 2 + 1);
        scanf("%d %d", &a, &b);
        while (a < 0 || a > 2 || b < 0 || b > 2 || res[a][b] != 0) {
            printf("Essayez encore une fois\n");
            scanf("%d %d", &a, &b);
        }
        // Enregistrement du coup
        c = i % 2 + 1;
        res[a][b] = c;
        // Affichage de la grille et des symboles
        for (int i = 0; i < 19; i++) {
            for (int j = 0; j < 19; j++) {
                int d = i / 6;
                int f = j / 6;
                if (i == 0 || i == 6 || i == 12 || j == 6 || j == 12 || i == 18 || j == 0 || j == 18) {
                    printf("#");
                    if (j == 18) {
                        printf("\n");
                    }
                } else {
                    if (res[d][f] == 0) {
                        printf(" ");
                    } else if (res[d][f] == 1) {
                        // Dessin de la croix
                        if ((i % 6 == j % 6) || (i % 6 + j % 6) == 6) {
                            printf("#");
                        } else {
                            printf(" ");
                        }
                    } else {
                        // Dessin du rond
                        if ((i % 6 == 1 || i % 6 == 5) ^ (j % 6 == 1 || j % 6 == 5)) {
                            printf("#");
                        } else {
                            printf(" ");
                        }
                    }
                }
            }
        }
        int k = 1;
        int flag = 0;
        // Verification des lignes : produit egal a 1 ou 8
        for (int i = 0; i < 3; i++) {
            k = 1;
            for (int j = 0; j < 3; j++) {
                k *= res[i][j];
            }
            if (k == 1 || k == 8) {
                flag = 1;
                break;
            }
        }
        // Verification des colonnes
        for (int i = 0; i < 3; i++) {
            k = 1;
            for (int j = 0; j < 3; j++) {
                k *= res[j][i];
            }
            if (k == 1 || k == 8) {
                flag = 1;
                break;
            }
        }
        // Verification des diagonales
        if ((res[0][0] * res[1][1] * res[2][2] == 1) || (res[0][0] * res[1][1] * res[2][2] == 8)) {
            flag = 1;
        }
        if ((res[2][0] * res[1][1] * res[0][2] == 1) || (res[2][0] * res[1][1] * res[0][2] == 8)) {
            flag = 1;
        }
        if (flag) {
            printf("Le joueur numero %d est le vainqueur !\n", c);
            return 0;
        }
    }
    printf("Match nul !\n");
    return 0;
}
