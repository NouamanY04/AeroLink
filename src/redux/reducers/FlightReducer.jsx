// import { setInfoTrip, setInfoContact, fetch_data_flights } from '../actions';

const initialState = {
    flights: [
        {
            id: 1,
            airline: "Air Asia",
            logo: "https://transvelo.github.io/mytravel-html/assets/img/90x90/img2.png",
            heure_depart: "12:45",
            date_depart: "2025-07-10",
            heure_arrive: "20:30",
            date_Arrive: "2025-07-10",
            departure_place: "Turkey",
            arrival_place: "Thailand",
            type_vol: 'Oneway flight',
            duration: { hours: 6, minutes: 30 },
            price: 890,
            stops: 2,
            type: 'Economy'
        },
        {
            id: 2,
            airline: "Lufthansa",
            logo: "https://transvelo.github.io/mytravel-html/assets/img/90x90/img4.png",
            heure_depart: "06:45",
            date_depart: "2025-07-12",
            heure_arrive: "09:30",
            date_Arrive: "2025-07-12",
            departure_place: "Frankfurt",
            arrival_place: "Madrid",
            type_vol: 'Oneway flight',
            duration: { hours: 5, minutes: 30 },
            price: 440,
            stops: 0,
            type: 'First class'
        },
        {
            id: 3,
            airline: "Turkish Airlines",
            logo: "https://transvelo.github.io/mytravel-html/assets/img/90x90/img3.png",
            heure_depart: "20:00",
            date_depart: "2025-07-15",
            departure_place: "Marrakesh",
            heure_arrive: "23:15",
            date_Arrive: "2025-07-15",
            arrival_place: "Istanbul",
            type_vol: 'Round-trip flight',
            duration: { hours: 7, minutes: 45 },
            price: 399,
            stops: 3,
            type: 'business'
        },
        {
            id: 4,
            airline: "RAM",
            logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Logo_Royal_Air_Maroc.svg",
            heure_depart: "02:00",
            date_depart: "2025-07-10",
            departure_place: "Marrakesh",
            heure_arrive: "12:15",
            date_Arrive: "2025-07-10",
            arrival_place: "Paris",
            type_vol: 'Onewayflight',
            duration: { hours: 2, minutes: 15 },
            price: 599,
            stops: 0,
            type: 'Economy'
        },
        {
            id: 5,
            airline: "Fly Emirates",
            logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg",
            heure_depart: "10:00",
            date_depart: "2025-07-10",
            departure_place: "Dubai",
            heure_arrive: "23:15",
            date_Arrive: "2025-07-10",
            arrival_place: "Marnahtten",
            type_vol: 'Round-trip flight',
            duration: { hours: 12, minutes: 45 },
            price: 1299,
            stops: 6,
            type: 'business'
        },
        {
            id: 6,
            airline: "Air Asia",
            logo: "https://transvelo.github.io/mytravel-html/assets/img/90x90/img2.png",
            heure_depart: "12:45",
            date_depart: "2025-07-10",
            departure_place: "Thailand",
            heure_arrive: "20:30",
            date_Arrive: "2025-07-10",
            arrival_place: "Indonisia",
            type_vol: 'Oneway flight',
            duration: { hours: 6, minutes: 30 },
            price: 1020,
            stops: 2,
            type: 'business'
        },
        {
            id: 7,
            airline: "Fly Emirates",
            logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg",
            heure_depart: "08:00",
            date_depart: "2025-07-10",
            departure_place: "Dubai",
            heure_arrive: "14:00",
            date_Arrive: "2025-07-10",
            arrival_place: "London",
            type_vol: 'Round-trip flight',
            duration: { hours: 7, minutes: 0 },
            price: 1200,
            stops: 1,
            type: 'Business'
        },
        {
            id: 8,
            airline: "Lufthansa",
            logo: "https://transvelo.github.io/mytravel-html/assets/img/90x90/img4.png", // Placeholder, you might want to find a more appropriate image
            heure_depart: "16:15",
            date_depart: "2025-07-10",
            departure_place: "Germany",
            heure_arrive: "23:45",
            date_Arrive: "2025-07-10",
            arrival_place: "New York",
            type_vol: 'Oneway flight',
            duration: { hours: 8, minutes: 30 },
            price: 950,
            stops: 1,
            type: 'Economy'
        },
        {
            id: 9,
            airline: "Qatar Airways",
            logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAA8FBMVEX///9pDDaIkptmADBkAC1iACn18PKDjpdfACNgACVcABxhACekfYpnADJ+iZNjACvy8/Sepq3Tw8n4+fmhgYlwEz5UAADazNHr5OapsLbg4uRYABHr7O6Wn6a7wMV2go13OEyTaHbIzNCLWmnS1tmJUWfo3OHJtLyDSV9bABexjprBo69XAAqyuL13LkuphpJ7RVN/P1hMAABuIT2EgIyac36MZGuban5zIESVXnNsKDu0mKBzPkdcGxxnFzJjJkN7b352XGydmKFoNU9iOkyUhpRpSF50RVthIyizq7JiFyiLb32DVlxCAABrLTe5pKfgjWHhAAAVvUlEQVR4nO1dZ5ui2LYWCRJFoVpQ1DKCGEDLtrSkr9N95s6Zc3t6pv7/v7k7kVGrwxnpeXw/VEDQ/e619ko7WKnccccdd9xxxx3/BDjTmXHrNvwYGNOn1nJt37oZ3w+dW3hP7nH/D5ALZ8/ftcT17p9ARfO3S3Hwz6DycBDFrazduiE/ANrDVuTZocPduiHfD8P3eFacOeatG/L9MP0Bo4jSIkOF+wkHjz4fULTa2nF68qq9GH/4n8Wt2vStcDxJoZdeSgq2vzmJT4z8kw0gbtOiFemUFIG9p1uuKL78bGaN81uqwmwjCeic4dNPrrqdLUohlEY3RgNDR8jfyjmeS6nUMBSBacw91xWUdVl8TadXg6gi9ACazWa7vVr1R6NJp5u8Uzd2gkoLYyIDznCmvMsL3vO8NCHmpBehSdCGAHT6o07iRjsYiArv+ajluu3I1FIS1JlfKq/Z7YQIla1Qx5yxxNDiGOkTp81nDM/wQEpGgTaWHba85RV+G0AvaQfPnqAqIrvTSqNfX4PFWlAY8QWKwditKUFRXMU3yqJfjckIDHCCSMmQIcvfbA9PDGUd4OBwXgYqQynL09wuCxW9WavGJqxarSX/Cc0aMATYpC2OQKfcoAIFdKIVQGVbDqeC0anXq0WohaiHqFXf/yIyLC+DUT+nXJqiFPFQsgCss2r2qr2MUQ7tMdY/oHZQ55wDT5+GJqAiWkAozOno3Lrx3wpz2JJOY0M3gyWkom6nJZPK28FpB4sFQZcZHFyFoqTtsExj5etg+6y7DWwz2IgMoEKVMENuxB4/9vkkxsTxJbbOujMVraFmL2a8SlGMMC5fhtzpt5uZSCwZkCEbsIJmoO97S2phOkOaBRaMH2Qz5DKgV3sbPv7CLoe2tgPaRVG88uk9jqX7nesf8feh/Zj2jhm3gvBYr37aiszC9gcsGPesNPwX5NGHKUGpwkp90k44eZK8IPeCHAxCp7Nh3bHtrBlARVlujOJM7eeASbGUb+4s4O4p4fTTOhYEB0SS25ctD6gop33prHEMPYWiOxqBACWiKpBLmUOXbmfUx3YXg4yRySjOBGxZgjQweNmGME0OoFzjRp/0gNnK2a4oPkYW+VeWiqFQnreZTcfDnez7QfDqIL4g/rw1FeAvq8VxfwIff2WoJBSaZhhVEgSeF0W39b+PtWqvuRp1bs+msarVL7hJkOJ89GjqHBSR8mGqBoXTvf5h/3U0OqMVCmaS4csqRH/y25am1TwNyXUtq0XLpUn5Q+iNLGLT5pxoevaSl81+EQSOYZaNykUsjjQlPNhjKcOlbElyCL0LYv5OXFRO+prFCZhk1a8ssorGHEtSR06i268+nkO9/m8ecKGBk9QGWUVTt06Du+ho/3ZMLhrmT5CBwj7bFXusHrKy4T+BQLpKik99WOu4ravR+48XuPyxhXKhYE2ce7b2eyHNhlZ/fw+yBeRZUbzdHjVuSabSaVfPeZjqxy0UDI9GOvfcMrRl1qKxh0+/4QAIyeWmTCAak367XZAmt1fvERdRRrdxz1PdbOV9pjpdlKtKnpwji6sYxgDGMArFVaAr4R6Mis4rOTYgjh6XayqmCNyMR11/cNBcnm6Csf2uMKxRWQ/wKUdhAxX+Y4Rh/5Qnbd1aUTuLyQBLwCjb9VheaDeeAug0o/JFqtr/exTzq1508zkyFAqk6dPxr//cMm2b1GuFRvlT3GwrjluY82QwI8W6IRl9VOxmPm7jod6KVIfLmeaQgwIFA8BYt4xxGqtqNedoqu8TsQu7iW7WUqZZoRmVYYCwttvjYPBhDTCdTm9rp7sj4mdiB9P8PaFOy1hx0hGAtx6Ph0PZny8cTTNsk+PKEaBlKjOLbUwG+hkCLhk4K5vg1rbrTcDekoAEABDzZEqjDPxg4TgOkAkUSkmkUumM+kmM+mM+0Wg3WnFlp5MAReAFVTkMUJVm9/Dgz+dBEGg3FVZ31csYgN+TVSX+JWwdt0tXaCIrwKisJAiCxLIMzd90YZnezzqaj6n+5yNTO2cKArMs3OCW6gbymQyZVOP4cRjKBMpVLtDN3LZuq4969cdE/fJ3laKFSDgSaRwnizkuwFMCDRNE0VouWy1L5JWD93LzdEDvdiZkjr8zaTHs2p+R4REOAWPWYuhMKHM6Hr3NdC9DNwPt2Y1JFGL3RbYXpN20h4N/3/28HsrrFJutbJglMcc5JJymGURCgOtiKsbmWYbZFzdMmbONHDiOEc8GlMXT4CmN/gi7mT+sUDDTPtS9kUaWN2mn5LhheNEVRfod0LXxDgQ1wevr6+3XYgMTkJrNeE9K/vQv73FFPcpxPmWrmuAm4GiAm+FFUXTd5cOtueSnNDAb1nufywx+KfKbsXkb3L7G2ejX6uk5jfe/gm7+9/v87NNH4ZyzgfmAOC7BsNG7k/4KpAHxXEY7CP4vmhWcxAsDu046o2Ek3rWWraUrAB8zeynJTKdeDPRS8j5uKMZUePYwBW4G5zIlsmdvhn0Ih43ilUQQ3wGNDYeN4oqHF3nhoISmLPMAGA2S1qTLZ5NOcgUthPkgJcYM8DVgyFiuy9JueQKaUbV44rxeR9M0CNjZ/PZrUb1JseTrH/J3oVrPLAAunniuAzf6kSqwz/ysRGqGls2Gnj4FVLdpRlYbaOL8lGYDfAy/vX0kkwDIAzpwjETDJLPCMV7dWOEe4tIt77oCBcKzn9eycdOwgDb1QTZjAHtWIiX7Wpg09jbv5J+idnYF9hM2advBhw8f1mXVse5oFa01Cd0OcTd45BDvqJGwRlFU0b91o8+g/XjW2SQWB9RrILchlUL6c3DrRp9DO5fCALeTvwRN9h/QQNNsCXKYs+iA/Dla0ZSo2YZbNNAiObQ1iPNPNHval2Mq87sB2KxLuhjoG8A5Ny/5vR3lCuu/C30cjiWWBIZDp1Oy1fJvQHLhFjDNaLIAxp1tuPb/1o37WsT7aRI7teNo84477rjjjjvuuOOOO+6444477igPOMNZADg/5zlQSdj+ZnsCUOGP7fT6YSqaN51uM7MTi+kerliaLxKYz+eyvH+ZZx7n+OnUKyyiG7KPHvT3+xeIvTzXvqqq63hLXoVr9FWGQb/E1uZyiZvzLYaRvPTFV4uV4P7lNHheYMVd5nn4uDgu0gHjA3lMYFlVVVmW561rrYmha0qLgdP0p7820+lscGTQMqXW5tIsqoE2MC/TrVmcXcbEZKbKdXRVKpp3MuI1hHDvA42md5mnt81PczKkQqnHId5uxBnzMQWvCNL8rHj1BZo+EtJtfBVVSZJUlYnWzio06Ftwic+QWaBpTvGhQJvtNe4S5WXuy7v9eIBXGoqzN8wg2jMRrZ4YJ3qJC9Zwcoh2h+dsgTlFU8jKNtVfr+vx824ny768wQ3a7sGAedjtnteZhXJj1EDaKxC+OSar8XCDOE3G6/Oz/VEAYwP7SDnt0kIw8KJ4a3hGNpqFe/6UUhQ73IjNPaCepwe4sbppp3tFO2LRia9FZPCOCDV6awetxL9+eoUxQ2tb1F220fYY6ZG7L1RVbhdO6w0L35aTCZkz4/aBDAvpJa873JcsGd1ncCMvczGHiAszywuAbL5wszYVwQ4XxyuDQkXkHvhLZMJhARqY1zOOSIaOBeF48OPU54ujRg/wfsRT0Wc6+DW+qLWBG9mpQrJXyCyip8V5TvLcc46Mjfgxlw+mJ2vb1H3Ri+YQNUgqeJGL1sRRzLCouy6T4XbRAhRayT2uPxNrFpPhnllE5pKv4GQ8PX9m7ZeG9F455t/CWYK3Jh9ZuMLvMhkH+CiaLEFp5R7Xh0gyCpUkc10yNj4cRno58zI2v3TeJALBSLKMtYEvWp18kYzu87DfsT1UZ7nX8VL1PJnLY2aONb91xuRwcyQ4ep19D/uJoinHwFuXmKIdfRfJGDMV7uZUsEVr5R4nknkXP4vHjHTJmuke1pTWuRsc7BhzLdoLFPts6jssGqZgQvwimVfQRzQXdqWYE3yeDD734eLhVRxedax6527QPGyAM8EtB5s5h7sA0ctCzkddJmOOJQouoLGxq1LUHBkmS2bOoCFzKXYmS6jPr8yB+kDlg8SAxWPRxBGhcsi3+BIZDTwlwcMcXjAbN2sCcmQM6JYU+mIA4GNbdn6vlD1GesamdZWb0RSDLslY6/kCX3GeDDShPDoijJgAJmsCsmQMeO4LI1xe3vGCrePyrPUm8YH0nGqss1UUfO6KgSMsZpMbwxfI2O8UCm9pNvExSMrnzOOEDBG4HawlSlleW+M9xUuOrbPW29yhO9i0SdwxwILhP8n+LDH3QefJ6IEIzDHONbC1zKnxMFw36DgLebemVMk6BNdSeULGPTuuCsnA3EkiIsdZCSXkDpY7TwYGDyLZ0ajhtIfOjOxwS9R2u6UYlqHosXZ9i9dVMvawgMwcjl9ygSPLyYVsv50noy3BaCCKTdSY3qaHQ0hGIDtWhLdsTX3BTRHPShD7qrQBgNf4KFwjb+H6mZ47T8ZTqXjf7ALbM3WYepyQERYyCXnUN6zqlPkrY8aY5fOIhZJ02ja27gqd6buzZIwWpcQRpIET0sxthAz/GmYK7Ox68WthXbFmGjl1LRHlmzvQWzxnEnDvsCYsM3bzLBlgQZmZFj5uk/CZT7m6kExQCYjCvWHbsIG7dXlWiA4Om5MtcuDK/sO7CORAJnr7NjImCmHi5ymiR6maU0yGw6UCSmGuLrcnZ1yIhelVBVtRaDkTgSYHHa1Cq7CihapaYRWmlf60c2Tg4zSjkoKYqkZFpWSHDkk4DsThkOycL8yaUo3F+T+bD8IxzCFSgqQbMEBsSh88zxtAeN7hQNgI6TSCkMnGqBzwsvDsxvBxLzxpKxXfJchUhsQGWFeXd5J4wjrzsoY2iyinuNNhtYzZOEYETSNWRBFSBp5UZ7JkFidwKfG4Yci4rQqVuDFJxnZxb9GnaxVa84DEfCafIVrGJuov5oylrHQMbYSKkBrDEZn0eByD4CFdziFJEXg80iM9Sabik5oWP71CRg/QnVLxfSZOd1qJLtHE3FjkcDoK2p3U6pBMOqKC1bJTxtyQ0U4fIhMQ1gAwGS48VigfM2VgD1AnFLpNHUdOrYR5aADDmh2K+mtYDkxqNbcrIgOyOeVDxsgCzcO6HlfJSHWGn6NPCvd6Kn9dczaOhQpSRUUAG9k6MWkd4IFluQ6ySV1Z/VJAJjXnAdMSNlvr4f4ij29CDeBCyWAy3IzETOyZUkX8Vj76UCFvnTkF1c43yY7c8wXhfljcTFVPSdSlpKIueHZLvgr3Qo6niUZuRIZU1Q2JOJurZz6bO7iRMl/G5TwB7kNIVTo5UUkO1BAOKQgmox5i1ZXk6Zkw1VMOuRY4xPiyM3KsnknKs2EIx/nExrBXv53SfIAFMOaYmirjDA+8AXNKl83nVqrMGMIgQQ8ziE0DyVEpKkEGHuhQkKJz4f46izxufyGSCX2P4RHhsVfDZy7weAUIYaiFO8FMbc6Ax6VBkHpWBxE5U/A9pFwY3LJxS0m8TSmxHUdRXb6uhJSXShrVMLwUwq7UAzJq6Oy0YwG0neIyikSNA8fRHCfYHXhK4flhxv3A6SW+aHYonC9j4qk2Em9TdEwGumD6XdHHh1vTCdNw5kyK9MKehqJ5Q/jMaf5GhYf2CoftQeEFGnzuMHtqH3d0edEqmlI1BhaP0PLD0yQND1+yImGZwxbPPxXOF/EueRxbTu2I/1/GLV9I4S27N+RpnG04/n5zYARXRBOa09xDnAZR1DP4FYjo+OLoknH98Ur0uIP03Iz+5yrZt9PeergTB7IUG5CaQeu0HZZqj+s3w5R5+HU3x5/t2wbPYHGi0bd4lHVD5dfB+QsVd5e3P0sJoKHr33d6sPYBGUOe/y9+xYquVwobmblmtr7Ml+OEyn+99htrnCpas28+HK6ooY34JODGPLB9J3+TntlnZ/9nLB/xpLQJ3YXxDcci2OR0PEl8COl0Rvjwe300mVQq3clkNOrDw/27I/xNho3RBLUNvgq3cDbQNXxRh3u1uvBUpHDPlv3nX/unL/kq9UJKO2sdGHxs0u0d8DzadpN95A0AIShaSsC7e/KJzcc++t2o13vwZKDHXn9Vr40qk+pjGzZ48thDbGtt+LON7u72Huuw+R1wX6fXHI16zbDV81cjyEtG2y6ziS90guBGXX4a29zYupZyFoLzVVq1aDks9DZq1SbWkmq1CU+hra9Ak+u9TgP80PERe1AmXdT6bq9WhfdOqvC2Srup6+1aFwo0+Rn5HfUa5abJmPPhdEBtuIruLyEZ8ZvIgBCU3rzG30kAjwOcEDKg77vNel+vjOrgWr9WB81sVGvwSmWESPSrVUSq0a4BDt1qB359KBRcUhZaPm7VDhkyU95tCcIMkJm3xrY+/EYyFd1OVt9ro15thcnUEmR6Hdj7I6h3QEKguT2oXo0muBupGxJNu42+C7WZ/sYJbStcJWO0mOlizH8/mRQmdSAb3JqIDNyeuYItr7cr+mo1qdWAMB7hPZNed1WrQq2E34Y4gpLTm/VqdZU82Fxz6SIyqWtOy3MqvvuDyTTble5jdZQgU+utqj2keO3aY0WvdrrQRADSoOHtld6t1dDdkyoeNkA09WqoqQC2I7OYjIxy1MUck5H2cEHjfo45OcuDvJj+YMl0QOdCCTRiMnUwHHroxVH1sTvpwWFV1Zt91O4JvA2/2qzViQlZweMCsG023VaLVxCZF5QZmOs/DUQG2E9RBNlGC6UATksRLYb9sWT6tXa73cNNCcmMgF4ha93t1UftPhTCY6cO6Y5qTXQ3llu1Hg49aA6wfZ/x1PGIyNhPCsx65jSqE2sH+vgBYkAtYSbofD4ej9SPJdPt9TudzqiK7FVkzSqgvWgUAZWDf4BrPWjLus0V3BhcJR6HkEE/elj39JM6NRYCkoxFQzIBo8A5PO3AL9C3IhlD0TPhxnuQxIzRCUI/jMwID2Zsr5Cf6UI/06lXkb/sV2vIGa5q0CqA4d8hFDsxGX0C36KH1Yz7zMw5h1cc0GwRkeHGtDC37cVBdPDkzVw8aDbGTtwYti1bP4ZMo7nCkcojMMI6jgB60O+3H1FPd+qPI8wZ2rJGGw0teDek1qw/wn+7zX63O0GiBbr1WdkMZwq1mc1mNCJTcU7KYTrdUPR0iLChqdkUvAx+eMq76WzqST+GTHeFh2233e439DYcH91VewTismYbxmA6aX5nBRWrscImC97YQEcFIDKrXhs9g1q+5N0lSOxdy7J4F8WO9lGRLAtcs5YI5FUIaA/AT+uLzT23viU2S0FvhL9h3It+gD9huxrhL3wD/h2G9vjFBnkR7rIPveZCTgJlgcaRmfnyRQSmHuzKd9YLF0EPTweUlZbT4C4DPXjrtl+A88FZjLWKtmeeCldX/lTwWhuvtff/fDr8A0oO9t425H/I2Tp33HHHHXfcUVr8P+gtcnQMGwQcAAAAAElFTkSuQmCC", // Placeholder
            heure_depart: "01:00",
            date_depart: "2025-07-10",
            departure_place: "Doha",
            heure_arrive: "10:30",
            date_Arrive: "2025-07-10",
            arrival_place: "Sydney",
            type_vol: 'Round-trip flight',
            duration: { hours: 14, minutes: 30 },
            price: 1800,
            stops: 1,
            type: 'First Class'
        },
        {
            id: 10,
            airline: "American Airlines",
            logo: "data:image/jpeg;base64,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", // Placeholder
            heure_depart: "09:30",
            date_depart: "2025-07-10",
            departure_place: "Los Angeles",
            heure_arrive: "17:00",
            date_Arrive: "2025-07-10",
            arrival_place: "Chicago",
            type_vol: 'Oneway flight',
            duration: { hours: 4, minutes: 30 },
            price: 350,
            stops: 0,
            type: 'Economy'
        },
        {
            id: 11,
            airline: "Singapore Airlines",
            logo: "data:image/jpeg;base64,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", // Placeholder
            heure_depart: "22:00",
            date_depart: "2025-07-10",
            departure_place: "Singapore",
            heure_arrive: "06:00",
            date_Arrive: "2025-07-11",
            arrival_place: "Tokyo",
            type_vol: 'Round-trip flight',
            duration: { hours: 6, minutes: 0 },
            price: 750,
            stops: 0,
            type: 'Premium Economy'
        },
        {
            id: 12,
            airline: "Qatar Airways",
            logo: "data:image/png;base64,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", // Placeholder
            heure_depart: "06:45",
            date_depart: "2025-07-12",
            heure_arrive: "09:30",
            date_Arrive: "2025-07-12",
            departure_place: "Frankfurt",
            arrival_place: "Madrid",
            type_vol: 'Round-trip flight',
            duration: { hours: 5, minutes: 30 },
            price: 23440,
            stops: 0,
            type: 'First class'
        },
        {
            id: 13,
            airline: "Fly Emirates",
            logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg",
            heure_depart: "06:45",
            date_depart: "2025-07-12",
            heure_arrive: "09:30",
            date_Arrive: "2025-07-12",
            departure_place: "Frankfurt",
            arrival_place: "Madrid",
            type_vol: 'Round-trip flight',
            duration: { hours: 5, minutes: 30 },
            price: 15500,
            stops: 0,
            type: 'Business class'
        },

    ],
    infoTrip: {
        type: 'oneWay',
        nbrAdults: 1,
        nbrChildren: 0,
        from: '',
        to: '',
        date_depart: '',
        date_Arrive: '',
    },
    infoContact: {
        fname: '',
        lname: '',
        email: '',
        message: '',
    }
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'fetch_data_flights':
            let flightsArray = [];
            if (Array.isArray(action.payload)) {
                flightsArray = action.payload;
            } else if (action.payload && Array.isArray(action.payload.flights)) {
                flightsArray = action.payload.flights;
            }
            return { ...state, flights: flightsArray };
        case 'set_infoTrip':
            return { ...state, infoTrip: { ...state.infoTrip, ...action.payload } };
        case 'set_infoContact':
            return { ...state, infoContact: { ...state.infoContact, ...action.payload } };
        default:
            return state;
    }
}

export default reducer;