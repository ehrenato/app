const querys = {

  // Consulta para autenticação de Usuário.
  getLogin: `SELECT TOP 1 pwdcompare(@senha, l.senha) as retorno, u.usuario_empreendedor_id, 
    u.cliente_id, l.nome, l.email, l.ativo, pc.cliente_id_int 
    FROM USUARIO_EMPREENDEDOR u, usuario_empreendedor_login l, 
    PROCESSO_CLIENTE pc
    WHERE u.usuario_empreendedor_id = l.usuario_empreendedor_id
    AND u.cliente_id = pc.cliente_id
    AND l.login=@login AND l.ativo='1'`,

  // Consulta de Novidades por Cliente.
  getNovidade: `SELECT p.processo_id, 'Anexo' as tp_novidade, CONVERT(VARCHAR, a.data_anexo, 103) +' '+ CONVERT(VARCHAR, a.data_anexo, 108) AS data, 
  tp.tipo_anexo_descricao AS texto , p.numero, p.descricao 
    FROM anexo a, PROCESSO p, PROCESSO_CLIENTE pc, TIPO_ANEXO tp    
      WHERE p.processo_id_int = pc.processo_id_int 
     AND pc.cliente_id_int = @id_cliente 
     AND p.processo_id = a.processo_id 
     AND a.tipo_anexo_id = tp.tipo_anexo_id
     AND a.fim_da_fila_real = 1  
UNION         
  SELECT p.processo_id, 'Movimento' as tp_novidade, CONVERT(VARCHAR, mp.data_hora, 103) +' '+ CONVERT(VARCHAR, mp.data_hora, 108) AS data, 
    mp.comentario AS texto , p.numero, p.descricao 
    FROM MOVIMENTO_PROCESSO mp, PROCESSO p, PROCESSO_CLIENTE pc      
      WHERE p.processo_id_int = pc.processo_id_int  
     AND pc.cliente_id_int = @id_cliente  
     AND p.processo_id = mp.processo_id
     AND mp.fim_da_fila_real = 1 
UNION    
  SELECT p.processo_id, 'Mensagem' as tp_novidade, CONVERT(VARCHAR, m.data_envio, 103) +' '+ CONVERT(VARCHAR, m.data_envio, 108) AS data, 
    m.mensagem AS texto , p.numero, p.descricao 
    FROM MENSAGEM m, PROCESSO p, PROCESSO_CLIENTE pc
      WHERE p.processo_id_int = pc.processo_id_int  
     AND pc.cliente_id_int = @id_cliente 
     AND p.processo_id = m.processo_id
     AND m.fim_da_fila_real = 1 
UNION             
  SELECT p.processo_id, 'Anotação' as tp_novidade, CONVERT(VARCHAR, ap.data_registro, 103) +' '+ CONVERT(VARCHAR, ap.data_registro, 108) AS data,
    ap.descricao AS texto, p.numero, p.descricao 
    FROM anotacao_processo ap, PROCESSO p, PROCESSO_CLIENTE pc
      WHERE p.processo_id_int = pc.processo_id_int  
      AND pc.cliente_id_int = @id_cliente  
      AND p.processo_id = ap.processo_id
      AND ap.fim_da_fila_real = 1`,

  //Consulta de Mensagens User.
  getMessagens: `SELECT titulo, CAST(MENSAGEM AS TEXT) AS MENSAGEM, m.tipo_mensagem_id, mensagem_id, p.numero, data_envio, sigla_usuario_origem, 
  usuario_origem_id, dg.numero_universal, ISNULL (CONVERT(VARCHAR(10), mascara_pai),'') + CONVERT(VARCHAR(10), mascara) AS t, mascara,mascara_pai, 
  UPPER(TIPO_MENSAGEM) AS TIPO_MENSAGEM, atendimento, texto_atendimento 
  FROM MENSAGEM m LEFT JOIN TIPO_MENSAGEM tp ON m.tipo_mensagem_id = tp.tipo_mensagem_id, PROCESSO p, DOCUMENTO_GENERICO dg 
  WHERE m.processo_id=p.processo_id AND dg.documento_generico_id = m.documento_generico_id AND p.processo_id = @idProcesso
  AND ((NOT p.tipo_processo_id = '0120') OR (m.sigla_usuario_origem = 'EM') OR ( usuario_origem_id IN 
  (SELECT usuario_id FROM USUARIO WHERE area_id='0086' AND sigla_categoria = 'CO'))) AND m.data_exclusao IS NULL ORDER BY t, mascara`,

  deleteProduct: "",

  getTotalProducts: "",

  updateProductById: "",

};

exports.querys = querys;