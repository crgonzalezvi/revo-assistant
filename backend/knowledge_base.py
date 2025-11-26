"""
Base de Conocimiento sobre Industria 5.0
Este archivo contiene toda la información que el chatbot utilizará
"""

KNOWLEDGE_DOCUMENTS = [
    {
        "id": "industria5_definicion",
        "title": "Definición de Industria 5.0",
        "content": """
        La Industria 5.0, conocida como la Quinta Revolución Industrial, es un modelo de desarrollo 
        industrial que combina tecnologías avanzadas con un enfoque centrado en las personas. 
        
        A diferencia de la Industria 4.0 que priorizaba la automatización y eficiencia, la Industria 5.0 
        incorpora valores humanos, sociales y medioambientales en el núcleo de la innovación tecnológica.
        
        Características principales:
        - Colaboración humano-máquina: Fusiona las capacidades de computación cognitiva con el ingenio humano
        - Producción personalizada: Adaptación de productos a necesidades individuales
        - Sostenibilidad: Procesos más eficientes energéticamente y economía circular
        - Resiliencia: Mayor capacidad de adaptación ante cambios y crisis
        - Empoderamiento humano: Los trabajadores realizan tareas más creativas y estratégicas
        
        La Comisión Europea define la Industria 5.0 como un enfoque que va más allá de la eficiencia 
        y productividad como únicos objetivos, reforzando el rol y la contribución de la industria a 
        la sociedad.
        """,
        "metadata": {
            "category": "definicion",
            "keywords": ["industria 5.0", "quinta revolución", "definición", "concepto"]
        }
    },
    {
        "id": "cobots_introduccion",
        "title": "Robots Colaborativos (Cobots)",
        "content": """
        Los cobots (robots colaborativos) son robots diseñados específicamente para trabajar junto 
        a los seres humanos de manera segura, sin necesidad de barreras de protección.
        
        Características de los cobots:
        - Seguridad: Incorporan sensores y sistemas de parada automática para prevenir colisiones
        - Flexibilidad: Fáciles de programar y pueden adaptarse rápidamente a diferentes tareas
        - Versatilidad: Pueden realizar desde tareas repetitivas hasta manipulación de objetos pesados
        - Precisión: Ejecutan tareas con exactitud constante
        - Accesibilidad: Más económicos que robots industriales tradicionales
        
        Los cobots son fundamentales en la Industria 5.0 porque representan la perfecta simbiosis 
        entre humano y máquina, donde cada uno aporta sus fortalezas únicas.
        """,
        "metadata": {
            "category": "cobots",
            "keywords": ["cobots", "robots colaborativos", "robótica", "automatización"]
        }
    },
    {
        "id": "cobots_aplicaciones",
        "title": "Aplicaciones de Cobots",
        "content": """
        Los cobots tienen aplicaciones en múltiples sectores industriales:
        
        Industria Automotriz:
        - Soldadura colaborativa en líneas de producción
        - Ensamblaje de vehículos personalizados
        - Inspección de calidad con visión robótica
        - Pintura de precisión
        Ejemplo: BMW utiliza cobots para personalización de interiores de vehículos.
        
        Logística y Almacenamiento:
        - Paletizado y despaletizado de cajas
        - Gestión automatizada de inventario
        - Empaquetado personalizado
        - Clasificación de productos
        
        Industria Alimentaria:
        - Manipulación de productos delicados con precisión
        - Garantía de higiene en procesos
        - Empaquetado de alta velocidad
        - Trazabilidad completa del producto
        
        Sector Salud:
        - Asistencia en cirugías de precisión
        - Fabricación de prótesis personalizadas
        - Transporte de pacientes y materiales
        - Dispensación automatizada de medicamentos
        
        Manufactura Electrónica:
        - Ensamblaje de componentes miniaturizados
        - Control de calidad microscópico
        - Producción flexible de dispositivos personalizados
        """,
        "metadata": {
            "category": "cobots",
            "keywords": ["aplicaciones", "casos de uso", "sectores", "ejemplos"]
        }
    },
    {
        "id": "industria_4_vs_5",
        "title": "Diferencias entre Industria 4.0 y 5.0",
        "content": """
        Comparación entre Industria 4.0 e Industria 5.0:
        
        INDUSTRIA 4.0:
        - Enfoque: Automatización total y digitalización
        - Objetivo principal: Eficiencia y productividad máxima
        - Tecnologías clave: IoT, Big Data, Cloud Computing, robótica autónoma
        - Tipo de producción: Masiva y estandarizada
        - Factor humano: Los robots reemplazan tareas humanas repetitivas
        - Prioridad: Reducción de costos y optimización de procesos
        
        INDUSTRIA 5.0:
        - Enfoque: Colaboración humano-máquina
        - Objetivo principal: Bienestar humano, sostenibilidad y resiliencia
        - Tecnologías: IA, cobots, gemelos digitales, realidad aumentada + todas las de 4.0
        - Tipo de producción: Personalizada y flexible
        - Factor humano: Los humanos están en el centro, potenciados por la tecnología
        - Prioridad: Equilibrio entre progreso económico y bienestar social
        
        Los tres pilares fundamentales de la Industria 5.0 son:
        1. Centrada en el ser humano: La tecnología sirve a las personas, no al revés
        2. Sostenible: Economía circular y respeto al medio ambiente
        3. Resiliente: Capacidad de adaptación ante crisis y cambios
        
        La Industria 5.0 no reemplaza a la 4.0, sino que la complementa y la humaniza.
        """,
        "metadata": {
            "category": "comparacion",
            "keywords": ["diferencias", "industria 4.0", "comparación", "evolución"]
        }
    },
    {
        "id": "tecnologias_clave",
        "title": "Tecnologías Clave en Industria 5.0",
        "content": """
        Las tecnologías fundamentales que impulsan la Industria 5.0:
        
        1. Inteligencia Artificial (IA):
        - Permite que cobots aprendan y se adapten a nuevas situaciones
        - Optimiza procesos de producción en tiempo real
        - Mejora la toma de decisiones mediante análisis predictivo
        - Mantenimiento predictivo para prevenir fallos
        
        2. Internet de las Cosas (IoT):
        - Interconexión de dispositivos y sistemas de producción
        - Monitoreo en tiempo real de toda la cadena productiva
        - Recopilación masiva de datos para análisis
        - Comunicación máquina a máquina (M2M)
        
        3. Gemelos Digitales (Digital Twins):
        - Réplicas virtuales de procesos, productos o sistemas físicos
        - Simulación y optimización antes de implementación real
        - Pruebas sin riesgos ni costos
        - Mantenimiento predictivo avanzado
        
        4. Realidad Aumentada y Virtual (AR/VR):
        - Formación de trabajadores en entornos seguros
        - Diseño y prototipado de productos
        - Mantenimiento guiado paso a paso
        - Soporte técnico remoto en tiempo real
        
        5. Big Data y Analytics:
        - Procesamiento de grandes volúmenes de información
        - Identificación de patrones y tendencias
        - Optimización de recursos y energía
        - Personalización masiva de productos
        
        6. Computación en la Nube:
        - Almacenamiento y procesamiento distribuido
        - Acceso remoto a sistemas de producción
        - Escalabilidad según demanda
        - Colaboración global en tiempo real
        
        7. Ciberseguridad Industrial:
        - Protección de datos y sistemas críticos
        - Prevención de ataques cibernéticos
        - Cumplimiento de normativas
        - Privacidad de datos personales
        """,
        "metadata": {
            "category": "tecnologias",
            "keywords": ["tecnologías", "ia", "iot", "gemelos digitales", "herramientas"]
        }
    },
    {
        "id": "sostenibilidad",
        "title": "Sostenibilidad en Industria 5.0",
        "content": """
        La Quinta Revolución Industrial coloca la sostenibilidad como eje transversal fundamental.
        
        Economía Circular:
        - Reducción drástica de residuos y desperdicios mediante optimización
        - Reutilización y reciclaje de materiales al final de vida útil
        - Diseño de productos pensando en su durabilidad y reparabilidad
        - Optimización del ciclo de vida completo del producto
        - Simbiosis industrial: residuos de una industria como recursos de otra
        
        Eficiencia Energética:
        - Los cobots consumen hasta 10 veces menos energía que robots industriales tradicionales
        - Optimización de procesos para reducir consumo energético
        - Integración de energías renovables en plantas de producción
        - Monitoreo inteligente y gestión en tiempo real del uso energético
        - Recuperación de calor residual de procesos
        
        Reducción de Huella Ambiental:
        - Procesos más precisos generan menos desperdicio de materiales
        - Producción bajo demanda reduce sobreproducción y stock
        - Logística optimizada con menos transportes y emisiones
        - Uso de materiales más sostenibles y biodegradables
        - Descarbonización de procesos industriales
        
        Impacto Social Positivo:
        - Mejores condiciones laborales y ambiente de trabajo
        - Trabajo más seguro y menos peligroso para los empleados
        - Desarrollo continuo de habilidades humanas
        - Balance entre desarrollo económico y bienestar social
        - Creación de empleos más cualificados y mejor remunerados
        
        La sostenibilidad en Industria 5.0 no es opcional, es fundamental para la viabilidad 
        a largo plazo de la industria y del planeta.
        """,
        "metadata": {
            "category": "sostenibilidad",
            "keywords": ["sostenibilidad", "medio ambiente", "economía circular", "ecológico"]
        }
    },
    {
        "id": "beneficios",
        "title": "Beneficios de la Industria 5.0",
        "content": """
        La Industria 5.0 ofrece beneficios múltiples para todos los stakeholders:
        
        Para las Empresas:
        - Mayor flexibilidad y adaptabilidad ante cambios del mercado
        - Personalización de productos sin perder eficiencia productiva
        - Reducción de costes operativos mediante optimización
        - Mejor capacidad de respuesta ante crisis o disrupciones
        - Mayor resiliencia de la cadena de suministro
        - Imagen corporativa más responsable y sostenible
        - Retorno de inversión más rápido (ROI de cobots: 3-24 meses)
        
        Para los Trabajadores:
        - Empoderamiento y desarrollo profesional continuo
        - Tareas más creativas, estratégicas e intelectualmente estimulantes
        - Menor riesgo de accidentes laborales y enfermedades ocupacionales
        - Reducción significativa de fatiga física
        - Mejores condiciones de trabajo en general
        - Mayor satisfacción laboral y sentido de propósito
        - Oportunidades de aprendizaje de nuevas tecnologías
        
        Para la Sociedad:
        - Producción más sostenible y respetuosa con el medio ambiente
        - Menor impacto ambiental y huella de carbono
        - Productos más personalizados adaptados a necesidades reales
        - Mayor bienestar general de la población
        - Equilibrio entre avance tecnológico y humanidad
        - Creación de nuevos empleos cualificados
        - Desarrollo económico con responsabilidad social
        
        Beneficios Económicos:
        - Aumento de productividad sin sacrificar calidad
        - Mayor calidad consistente en productos
        - Reducción de desperdicios y mermas
        - Optimización de recursos materiales y energéticos
        - Menor costo total de propiedad (TCO) a largo plazo
        """,
        "metadata": {
            "category": "beneficios",
            "keywords": ["beneficios", "ventajas", "impacto positivo", "valor"]
        }
    },
    {
        "id": "futuro_tendencias",
        "title": "Futuro y Tendencias de Industria 5.0",
        "content": """
        El futuro con la Industria 5.0 y su evolución hacia la Sociedad 5.0:
        
        Concepto de Sociedad 5.0:
        Propuesto por Japón, busca equilibrar el desarrollo económico con la solución de 
        problemas sociales y ambientales mediante la tecnología inteligente.
        
        Transformaciones Esperadas:
        - Mayor integración de IA cognitiva y emocional en sistemas de producción
        - Cobots cada vez más inteligentes y adaptables a contextos complejos
        - Producción 100% personalizable a escala masiva (mass customization)
        - Fábricas completamente resilientes ante cualquier disrupción
        - Trabajo remoto en manufactura mediante realidad virtual inmersiva
        - Economía circular como estándar industrial global
        - Integración total de energías renovables en producción
        
        Nuevos Empleos que Surgirán:
        - Diseñadores de interacción humano-robot
        - Especialistas en sostenibilidad industrial
        - Analistas de experiencia de fabricación
        - Ingenieros de personalización masiva
        - Gestores de resiliencia operacional
        - Consultores en transformación industrial 5.0
        - Éticos tecnológicos industriales
        
        Desafíos a Superar:
        - Formación continua y recualificación de la fuerza laboral
        - Inversión significativa en nuevas tecnologías
        - Cambio cultural organizacional profundo
        - Desarrollo de regulaciones y estándares éticos claros
        - Reducción de brecha digital para acceso equitativo
        - Privacidad y seguridad de datos industriales
        - Aceptación social de la colaboración humano-robot
        
        Visión a Largo Plazo:
        Un mundo donde la tecnología potencia las capacidades humanas en lugar de reemplazarlas,
        donde la producción respeta y protege el planeta, y donde la industria sirve al 
        bienestar de toda la humanidad. La Industria 5.0 no es solo el futuro - está 
        sucediendo ahora mismo en empresas pioneras alrededor del mundo.
        """,
        "metadata": {
            "category": "futuro",
            "keywords": ["futuro", "tendencias", "sociedad 5.0", "evolución", "próximo"]
        }
    },
    {
        "id": "cobots_costos",
        "title": "Costos e Inversión en Cobots",
        "content": """
        Información sobre inversión y retorno económico de cobots:
        
        Rangos de Precios:
        - Cobots tradicionales (metal): €25,000 - €40,000 EUR
        - Cobots económicos (plástico alto rendimiento): €5,000 - €8,000 EUR
        - Robots industriales tradicionales: €100,000+ EUR
        - Accesorios (pinzas, visión): €2,000 - €10,000 EUR adicionales
        
        Retorno de Inversión (ROI):
        - Cobots económicos: 3-6 meses típicamente
        - Cobots tradicionales: 12-24 meses en promedio
        - Ahorro en costos laborales: 30-50% en tareas automatizadas
        - Aumento de productividad: 20-40% en líneas híbridas
        
        Factores que Afectan el Costo:
        - Grados de libertad (4 ejes vs 6 ejes)
        - Capacidad de carga útil (kg que puede manipular)
        - Alcance del brazo robótico (radio de trabajo)
        - Software de programación incluido
        - Accesorios específicos (pinzas, sensores de visión, etc.)
        - Costos de integración con sistemas existentes
        - Capacitación del personal operativo
        
        Costos Operativos:
        - Mantenimiento: muy bajo, menos de €500/año típicamente
        - Energía: consumo mínimo, 100-500W promedio
        - Actualizaciones de software: generalmente incluidas
        - Repuestos: vida útil de 35,000+ horas de operación
        
        Por qué los Cobots son Más Accesibles:
        - No requieren jaulas de seguridad costosas
        - Instalación más simple y rápida
        - Programación intuitiva, sin necesidad de expertos
        - Reutilizables para diferentes tareas
        - Accesibles para PYMEs, no solo grandes corporaciones
        """,
        "metadata": {
            "category": "cobots",
            "keywords": ["precio", "costo", "inversión", "roi", "económico"]
        }
    }
]

def get_all_documents():
    """Retorna todos los documentos de conocimiento"""
    return KNOWLEDGE_DOCUMENTS

def get_documents_by_category(category):
    """Retorna documentos de una categoría específica"""
    return [doc for doc in KNOWLEDGE_DOCUMENTS if doc["metadata"]["category"] == category]

def get_all_content_text():
    """Retorna todo el contenido como texto plano para contexto del LLM"""
    return "\n\n---\n\n".join([
        f"# {doc['title']}\n\n{doc['content']}" 
        for doc in KNOWLEDGE_DOCUMENTS
    ])