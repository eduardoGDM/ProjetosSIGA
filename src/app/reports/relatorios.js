import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


function relatoriosPDF(alunos){
    pdfMake.vfs = pdfFonts.pdfMake.vfs
    const reportTitle = [
        {
            text:'Relatórios',
            fontSize:15,
            bold:true,
            margin:[15,20,0,45],
            font: 'Roboto'
        }
    ]
    
       



    // const dataAlunos = alunos.map((aluno) => {
    //     return[
    //             {text:aluno.idade,fontSize:9,margin:[0,2,0,2]},
    //             {text:aluno.nome,fontSize:9,margin:[0,2,0,2]},
    //     ]
    // } )
    const dataRela = alunos.map((aluno) => {
        return[
                {text:aluno.nome,fontSize:9,margin:[0,2,0,2]},
                {text:aluno.idade,fontSize:9,margin:[0,2,0,2]},
        ]
    } )

  




    const details =[
{
    table:{
        headerRows:1,
        widths:['*','*','*','*'],
        body:[
            [
                {text:'Titulo',style:'tableHeader',fontSize:10},
                {text:'Topico',style:'tableHeader',fontSize:10},
            ],
            ...dataRela,
            // ...dataAlunos
            
        ]
    },
    layout:'headerLineOnly'
}

    ]


   function Rodape(currentPage,pageCount){
    return[
        {
            text:currentPage + '/' + pageCount,
            alignment:'right',
            fontSize:9,
            bold:true,
            margin:[0,10,20,0]
        }
    ]
   }
   const docDefinition = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],
    header: [reportTitle],
    content: [details],
    footer: Rodape,

  };
    pdfMake.createPdf(docDefinition).download()
}

export default relatoriosPDF