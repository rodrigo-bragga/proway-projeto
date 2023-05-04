import { Component } from '@angular/core';
import { IProduto } from '../../produtos';
import { ProdutosService } from 'src/app/produtos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent{
  produtos: IProduto[] | undefined;

  constructor( 
    private produtosService: ProdutosService,
    private route: ActivatedRoute
    ){
  };

  ngOnInit(): void{
    const produtos = this.produtosService.getAll();

    this.route.queryParamMap.subscribe(params => {
      const descricao = params.get("descricao")?.toLowerCase();
      
      if(descricao){
        this.produtos = produtos.filter(produto => produto.descricao.toLowerCase().includes(descricao))
        return;
      }

      this.produtos = produtos
    })
  }

}
