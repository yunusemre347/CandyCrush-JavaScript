document.addEventListener('DOMContentLoaded',()=>{
    const grid= document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 8
    const squares=[]
    let score=0

    const candyColors =[
        'red',
        'yellow',
        'orange',
        'purple',
        'green',
        'blue'
    ]


    //create board


    function createBoard(){
        for(let i=0;i< width*width;i++){
            const square = document.createElement('div')
            square.setAttribute('draggable',true)
            square.setAttribute('id',i)
            let randomColor = Math.floor(Math.random()* candyColors.length)
            square.style.backgroundColor=candyColors[randomColor]
            grid.appendChild(square)
            squares.push(square)
        }
    }
    createBoard()

    //drag the candies
    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;

    squares.forEach(square=>square.addEventListener('dragstart',dragStart))
    squares.forEach(square=>square.addEventListener('dragend',dragEnd))
    squares.forEach(square=>square.addEventListener('dragover',dragOver))
    squares.forEach(square=>square.addEventListener('dragenter',dragEnter))
    squares.forEach(square=>square.addEventListener('dragleave',dragLeave))
    squares.forEach(square=>square.addEventListener('drop',drop))

    function dragStart(){
        colorBeingDragged=this.style.backgroundColor
        squareIdBeingDragged= parseInt(this.id)
      
       
    }
  
    //drop candies once some have been cleared
    function moveDown() {
        for (i=0; i<=55; i++){
            if(squares[i+width].style.backgroundColor===''){
                squares[i+width].style.backgroundColor=squares[i].style.backgroundColor
                squares[i].style.backgroundColor=''}
                   //fill the first row 
    const firstRow=[0,1,2,3,4,5,6,7]
    const isFirstRow= firstRow.includes(i)
    if(isFirstRow && squares[i].style.backgroundColor===''){
        let randomColor=Math.floor(Math.random()*candyColors.length)
        squares[i].style.backgroundColor=candyColors[randomColor]
    }

            
        }
    }
 

    //checking for matches
      //check for row of five
  function checkRowForFive(){
    for (i=0; i<60;i++){
        let rowOfFive=[i,i+1,i+2,i+3,i+4]
        let decidedColor = squares[i].style.backgroundColor
        const isBlank= squares[i].style.backgroundColor===''
        const notValid=[4,5,6,7,12,13,14,15,21,22,23,28,29,30,31,36,37,38,39,44,45,46,47,52,53,54,55] //sınırdan eşleşmeleri engellemek amacıyla yazıldı
        if (notValid.includes(i)) continue  //şart sağlanmıyorsa devam et.

        if (rowOfFive.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
            score +=3
            scoreDisplay.innerHTML = score
            rowOfFive.forEach(index=>{
                squares[index].style.backgroundColor=''
            })
        }
    }
}
checkRowForFive()
  //check for row of four
  function checkRowForFour(){
    for (i=0; i<61;i++){
        let rowOfFour=[i,i+1,i+2,i+3]
        let decidedColor = squares[i].style.backgroundColor
        const isBlank= squares[i].style.backgroundColor===''
        const notValid=[5,6,7,13,14,15,22,23,29,30,31,37,38,39,45,46,47,53,54,55] //sınırdan eşleşmeleri engellemek amacıyla yazıldı
        if (notValid.includes(i)) continue  //şart sağlanmıyorsa devam et.

        if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
            score +=4
            rowOfFour.forEach(index=>{
                squares[index].style.backgroundColor=''
            })
        }
    }
}    
checkRowForFour()


    //check for row of three
    function checkRowForThree(){
        for (i=0; i<62;i++){
            let rowOfThree=[i,i+1,i+2]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank= squares[i].style.backgroundColor===''
            const notValid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55] //sınırdan eşleşmeleri engellemek amacıyla yazıldı
            if (notValid.includes(i)) continue  //şart sağlanmıyorsa devam et.

            if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
                score +=3
                rowOfThree.forEach(index=>{
                    squares[index].style.backgroundColor=''
                })
            }
        }
    }
    checkRowForThree()

     //check for column of three
     function checkColumnForFive(){
        for (i=0; i<32;i++){
            let columnOfFive=[i, i+width, i+width*2, i+width*3, i+width*4]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank= squares[i].style.backgroundColor==='';
            if (columnOfFive.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
                score +=3
                scoreDisplay.innerHTML = score
                columnOfFive.forEach(index=>{
                    squares[index].style.backgroundColor=''
                })
            }
        }
    }
    // checkColumnForFive()
    function checkColumnForFour(){
        for (i=0; i<40;i++){
            let columnOfFour=[i, i+width, i+width*2, i+width*3]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank= squares[i].style.backgroundColor===''
            if (columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
                score +=3
                columnOfFour.forEach(index=>{
                    squares[index].style.backgroundColor=''
                })
            }
        }
    }
    // checkColumnForFour()


     function checkColumnForThree(){
        for (i=0; i<48;i++){
            let columnOfThree=[i,i+width,i+width*2]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank= squares[i].style.backgroundColor===''
            if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
                score +=3
                columnOfThree.forEach(index=>{
                    squares[index].style.backgroundColor=''
                })
            }
        }
    }
    // checkColumnForThree()

    function dragEnd(){  //i believe this is the limiter for drag action
        
        //what is a valid move?
        let validMoves = 
        [squareIdBeingDragged -1,
         squareIdBeingDragged-width,
         squareIdBeingDragged +1,
         squareIdBeingDragged +width
        ]
        let validMove = validMoves.includes(squareIdBeingReplaced)//includes true or false dönüt yapar. eger replaced kare valid moves array in içinde ise true dönüt olur

        //bu kısmı asagıya tasıyıp check fonksiyonlarını validate etmem gerekiyor(yaptık bişeyler. aşagı taşımadıkta okayToMove validationunu takip edersen anlarsın)
        let okayToMove = false;

        function isRowForFive(){
            for (i=0; i<60;i++){
                let rowOfFive=[i,i+1,i+2,i+3,i+4]
                let decidedColor = squares[i].style.backgroundColor
                const isBlank= squares[i].style.backgroundColor===''
                const notValid=[4,5,6,7,12,13,14,15,21,22,23,28,29,30,31,36,37,38,39,44,45,46,47,52,53,54,55] //sınırdan eşleşmeleri engellemek amacıyla yazıldı
                if (notValid.includes(i)) continue  //şart sağlanmıyorsa devam et.
        
                if (rowOfFive.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
                    okayToMove=true
                }
            }
        }
        isRowForFive()
          //check for row of four
          function isRowForFour(){
            for (i=0; i<61;i++){
                let rowOfFour=[i,i+1,i+2,i+3]
                let decidedColor = squares[i].style.backgroundColor
                const isBlank= squares[i].style.backgroundColor===''
                const notValid=[5,6,7,13,14,15,22,23,29,30,31,37,38,39,45,46,47,53,54,55] //sınırdan eşleşmeleri engellemek amacıyla yazıldı
                if (notValid.includes(i)) continue  //şart sağlanmıyorsa devam et.
        
                if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
                    okayToMove=true
                }
            }
        }    
        isRowForFour()
        
        function isRowOfThree(){
            for (i=0; i<62;i++){
                let rowOfThree=[i,i+1,i+2]
                let decidedColor = squares[i].style.backgroundColor
                const isBlank= squares[i].style.backgroundColor===''
                const notValid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55] //sınırdan eşleşmeleri engellemek amacıyla yazıldı
                if (notValid.includes(i)) continue  //şart sağlanmıyorsa devam et.
   
                if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
                    okayToMove=true
                }
           }
        }
        isRowOfThree()

        function isColumnForFive(){
            for (i=0; i<32;i++){
                let columnOfFive=[i, i+width, i+width*2, i+width*3, i+width*4]
                let decidedColor = squares[i].style.backgroundColor
                const isBlank= squares[i].style.backgroundColor==='';
                if (columnOfFive.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
                    score +=3
                    scoreDisplay.innerHTML = score
                    columnOfFive.forEach(index=>{
                        squares[index].style.backgroundColor=''
                    })
                }
            }
        }
        isColumnForFive()
        function isColumnForFour(){
            for (i=0; i<40;i++){
                let columnOfFour=[i, i+width, i+width*2, i+width*3]
                let decidedColor = squares[i].style.backgroundColor
                const isBlank= squares[i].style.backgroundColor===''
                if (columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
                    score +=3
                    columnOfFour.forEach(index=>{
                        squares[index].style.backgroundColor=''
                    })
                }
            }
        }
        isColumnForFour()
        function isColumnOfThree(){
           for (i=0; i<48;i++){
               let columnOfThree=[i,i+width,i+width*2]
               let decidedColor = squares[i].style.backgroundColor
               const isBlank= squares[i].style.backgroundColor===''
               if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
                   okayToMove=true 
               }
           }
       }
       isColumnOfThree()

        if (squareIdBeingReplaced && validMove && okayToMove ){
            squareIdBeingReplaced=null
            okayToMove=false
        }
        else if (squareIdBeingReplaced && !validMove || !okayToMove){
            squares[squareIdBeingReplaced].style.backgroundColor=colorBeingReplaced
            squares[squareIdBeingDragged].style.backgroundColor=colorBeingDragged
            okayToMove=false   
        }
        else squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
    }

    window.setInterval(function(){
        checkRowForFive()
        checkRowForFour()
        checkRowForThree()
         checkColumnForFive()
         checkColumnForFour()
         checkColumnForThree()
        moveDown()
    },100)

    function dragOver(e){
        e.preventDefault()  
    }
    function dragEnter(e){
        e.preventDefault()          
    }
    function dragLeave(){       
    }
    function drop(){   
        colorBeingReplaced = this.style.backgroundColor
        squareIdBeingReplaced = parseInt(this.id) //integer olsun diye
        this.style.backgroundColor=colorBeingDragged
        squares[squareIdBeingDragged].style.backgroundColor=colorBeingReplaced  
    }
})