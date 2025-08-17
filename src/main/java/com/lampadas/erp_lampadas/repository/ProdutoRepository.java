package com.lampadas.erp_lampadas.repository;


import com.lampadas.erp_lampadas.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByTipoContainingIgnoreCase(String tipo);
}
