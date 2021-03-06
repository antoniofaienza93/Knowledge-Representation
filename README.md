# Knowledge-Representation
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## Tecnologie Usate
- FLASK
- Bootstrap v4.1
- Apache Jena Fuseki v3.8.0
- RDFlib 
- [Protégé](https://github.com/antoniofaienza93/Knowledge-Representation/blob/master/docs/ontology.md#definizione-di-unontologia) 
- [Rule-reactor](https://github.com/anywhichway/rule-reactor#rule-reactor)


## Requisiti

- Installare flask `pip install flask`
- Installare SPARQLWrapper `pip install sparqlwrapper --user`
- Installare RDFlib `pip install rdflib --user`
- Installare [Apache Jena Fuseki](https://jena.apache.org/download/#apache-jena-fuseki)



## Come lanciare il progetto

- Lanciare il server FLASK con il comando `python app.py`
    - Il form si trova su: `http://localhost:5000`
- Lanciare dalla cartella contentente il server Fuseki e dare il comando:
    - ```./fuseki-server --update --mem /ds``` (LINUX)
    -  ```fuseki-server.bat --update --mem /ds``` (WINDOWS)
    - **NOTA:** Verificare lo stato del DB andando su: `http://localhost:3030/ds/`
- Eseguire ```python populateDB.py``` per popolare il dataset con i valori contenuti nei file csv in /assets/csv


