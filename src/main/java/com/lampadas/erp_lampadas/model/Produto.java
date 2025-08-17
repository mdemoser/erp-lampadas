
	package com.lampadas.erp_lampadas.model;

	import jakarta.persistence.*;
	import jakarta.validation.constraints.*;

	@Entity
	public class Produto {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    
	    @Column(nullable = false, length = 100)
	    @NotBlank(message = "Nome é obrigatório")
	    @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
	    private String nome;
	    
	    @PositiveOrZero(message = "Preço deve ser positivo ou zero")
	    @NotNull(message = "Preço é obrigatório")
	    private Double preco;
	    
	    // ... outros campos e getters/setters
	
    
    private String descricao;
    private String tipo;
    private String potencia;
    private String cor;
  
    private Integer estoque;

    // Default constructor
    public Produto() {
    }

    // Constructor with all fields
    public Produto(Long id, String nome, String descricao, String tipo, 
                  String potencia, String cor, Double preco, Integer estoque) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.tipo = tipo;
        this.potencia = potencia;
        this.cor = cor;
        this.preco = preco;
        this.estoque = estoque;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getPotencia() {
        return potencia;
    }

    public void setPotencia(String potencia) {
        this.potencia = potencia;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public Integer getEstoque() {
        return estoque;
    }

    public void setEstoque(Integer estoque) {
        this.estoque = estoque;
    }
}
