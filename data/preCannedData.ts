import type { StructuredSearchResultData, Language } from '../types';

const enData: StructuredSearchResultData[] = [
  {
    type: 'structured',
    medicalInfo: {
      name: "Lung Cancer",
      description: "A type of cancer that begins in the lungs. It is the leading cause of cancer deaths worldwide. People who smoke have the greatest risk of lung cancer, though it can also occur in people who have never smoked.",
      symptoms: ["A new cough that doesn't go away", "Coughing up blood, even a small amount", "Shortness of breath", "Chest pain", "Hoarseness", "Losing weight without trying", "Bone pain", "Headache"],
      causes: ["Smoking tobacco (leading cause)", "Exposure to secondhand smoke", "Exposure to radon gas", "Exposure to asbestos and other carcinogens", "Family history of lung cancer", "Air pollution"],
      commonTreatments: ["Surgery to remove the cancerous tissue", "Chemotherapy to kill cancer cells", "Radiation therapy to shrink tumors", "Targeted drug therapy", "Immunotherapy to help the immune system fight cancer"],
      medicines: ["Chemotherapy drugs (e.g., Cisplatin, Carboplatin)", "Targeted therapy drugs (e.g., Erlotinib, Crizotinib)", "Immunotherapy drugs (e.g., Pembrolizumab, Nivolumab)"],
      prevention: ["Don't smoke or quit smoking", "Avoid secondhand smoke", "Test your home for radon", "Avoid carcinogens at work", "Eat a diet full of fruits and vegetables", "Exercise most days of the week"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "Type 2 Diabetes",
      description: "A chronic condition that affects the way the body processes blood sugar (glucose). With type 2 diabetes, the body either doesn't produce enough insulin, or it resists insulin.",
      symptoms: ["Increased thirst", "Frequent urination", "Increased hunger", "Unintended weight loss", "Fatigue", "Blurred vision", "Slow-healing sores"],
      causes: ["Genetics and family history", "Obesity or being overweight", "Physical inactivity", "Insulin resistance", "Age (over 45)"],
      commonTreatments: ["Healthy eating and diet management", "Regular physical activity", "Blood sugar monitoring", "Weight loss programs"],
      medicines: ["Metformin", "Sulfonylureas", "DPP-4 inhibitors", "GLP-1 receptor agonists", "Insulin therapy"],
      prevention: ["Maintain a healthy weight", "Eat a balanced diet rich in fruits and vegetables", "Engage in regular exercise (at least 150 minutes per week)", "Avoid smoking and excessive alcohol", "Regular health check-ups"]
    },
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "Hypertension (High Blood Pressure)",
      description: "A common condition in which the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems, such as heart disease.",
      symptoms: ["Often has no symptoms (silent killer)", "Headaches", "Shortness of breath", "Nosebleeds", "Dizziness", "Chest pain"],
      causes: ["Genetics", "High-salt diet", "Lack of physical activity", "Obesity", "Stress", "Older age", "Kidney disease"],
      commonTreatments: ["Lifestyle changes (diet, exercise)", "Stress management techniques", "Reducing salt intake", "Limiting alcohol"],
      medicines: ["Diuretics", "ACE inhibitors", "Angiotensin II receptor blockers (ARBs)", "Calcium channel blockers", "Beta-blockers"],
      prevention: ["Eat a heart-healthy diet", "Maintain a healthy weight", "Get regular physical activity", "Don't smoke", "Limit alcohol consumption", "Manage stress"]
    },
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "Asthma",
        description: "A chronic disease affecting the airways in the lungs. These airways, or bronchial tubes, allow air to come in and out of the lungs. If you have asthma, your airways are always inflamed and can become even more swollen when something triggers your symptoms.",
        symptoms: ["Shortness of breath", "Chest tightness or pain", "Wheezing when exhaling", "Trouble sleeping caused by shortness of breath, coughing or wheezing", "Coughing or wheezing attacks that are worsened by a respiratory virus"],
        causes: ["Genetic predisposition", "Allergies (pollen, dust mites, mold)", "Respiratory infections", "Air pollutants and irritants (like smoke)", "Exercise", "Cold air"],
        commonTreatments: ["Using an inhaler (bronchodilator)", "Avoiding known triggers", "Developing an asthma action plan with a doctor", "Long-term control medications"],
        medicines: ["Inhaled corticosteroids (long-term control)", "Leukotriene modifiers", "Long-acting beta-agonists (LABAs)", "Short-acting beta-agonists (rescue inhalers like Albuterol)", "Combination inhalers"],
        prevention: ["Identify and avoid asthma triggers", "Get vaccinated for influenza and pneumonia", "Monitor your breathing", "Take medication as prescribed", "Work with your doctor to manage your condition"]
    },
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "Influenza (Flu)",
        description: "A contagious respiratory illness caused by influenza viruses that infect the nose, throat, and sometimes the lungs. It can cause mild to severe illness, and at times can lead to death.",
        symptoms: ["Fever or feeling feverish/chills", "Cough", "Sore throat", "Runny or stuffy nose", "Muscle or body aches", "Headaches", "Fatigue (tiredness)"],
        causes: ["Influenza viruses (Types A, B, and C)", "Spread through respiratory droplets from coughing or sneezing", "Touching contaminated surfaces"],
        commonTreatments: ["Rest and hydration", "Over-the-counter medications for symptom relief", "Avoiding contact with others to prevent spread"],
        medicines: ["Antiviral drugs (e.g., oseltamivir, zanamivir)", "Pain relievers (e.g., ibuprofen, acetaminophen)", "Decongestants and cough suppressants"],
        prevention: ["Annual seasonal flu vaccine", "Frequent hand washing", "Avoiding touching your eyes, nose, and mouth", "Covering coughs and sneezes", "Staying home when sick"]
    },
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "Migraine",
        description: "A type of headache that can cause severe throbbing pain or a pulsing sensation, usually on one side of the head. It's often accompanied by nausea, vomiting, and extreme sensitivity to light and sound.",
        symptoms: ["Severe, throbbing headache, often on one side", "Nausea and vomiting", "Sensitivity to light (photophobia)", "Sensitivity to sound (phonophobia)", "Visual disturbances (aura)", "Dizziness or vertigo"],
        causes: ["Genetic factors", "Hormonal changes in women", "Certain foods and drinks (e.g., aged cheeses, alcohol)", "Stress", "Changes in sleep patterns", "Strong smells or bright lights"],
        commonTreatments: ["Resting in a dark, quiet room", "Applying cold or warm compresses to the head", "Staying hydrated", "Identifying and avoiding triggers"],
        medicines: ["Over-the-counter pain relievers (e.g., ibuprofen, naproxen)", "Triptans (e.g., sumatriptan)", "CGRP antagonists", "Anti-nausea medications", "Preventive medications (e.g., beta-blockers, antidepressants)"],
        prevention: ["Identify and avoid triggers", "Maintain a regular sleep schedule", "Eat regular meals", "Manage stress through relaxation techniques", "Regular exercise", "Consider preventive medication if migraines are frequent"]
    },
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "Common Cold",
        description: "A mild viral infection of the nose and throat, causing symptoms like a runny nose, sneezing, and sore throat.",
        symptoms: ["Runny or stuffy nose", "Sore throat", "Cough", "Congestion", "Slight body aches or a mild headache", "Sneezing", "Low-grade fever"],
        causes: ["Rhinoviruses (most common)", "Spread through airborne droplets", "Contact with infected surfaces", "Weakened immune system"],
        commonTreatments: ["Rest and hydration", "Gargling with salt water", "Using a humidifier", "Symptom relief with over-the-counter products"],
        medicines: ["Decongestants", "Pain relievers (e.g., acetaminophen, ibuprofen)", "Cough suppressants", "Antihistamines"],
        prevention: ["Wash hands frequently", "Avoid touching your face", "Clean and disinfect surfaces", "Avoid close contact with sick people"]
    },
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "Gastroenteritis (Stomach Flu)",
        description: "An inflammation of the stomach and intestines, typically caused by a viral or bacterial infection. It leads to diarrhea, vomiting, and abdominal pain.",
        symptoms: ["Diarrhea", "Vomiting", "Nausea", "Stomach cramps and pain", "Occasional muscle aches or headache", "Low-grade fever"],
        causes: ["Viruses (like norovirus and rotavirus)", "Bacteria (like E. coli and Salmonella)", "Contaminated food or water", "Contact with an infected person"],
        commonTreatments: ["Oral rehydration (drinking plenty of fluids)", "Resting the stomach (avoiding solid foods initially)", "Gradually reintroducing bland foods", "Avoiding dairy, caffeine, and alcohol"],
        medicines: ["Anti-diarrheal medications (use with caution)", "Anti-nausea medications", "Pain relievers for fever and aches", "Antibiotics (only if bacterial)"],
        prevention: ["Frequent handwashing, especially after using the bathroom and before eating", "Proper food handling and cooking", "Avoiding contaminated food and water", "Rotavirus vaccination for infants"]
    },
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "Anemia",
        description: "A condition in which you lack enough healthy red blood cells to carry adequate oxygen to your body's tissues. Having anemia can make you feel tired and weak.",
        symptoms: ["Fatigue", "Weakness", "Pale or yellowish skin", "Shortness of breath", "Dizziness or lightheadedness", "Cold hands and feet", "Headaches"],
        causes: ["Iron deficiency (most common)", "Vitamin B12 deficiency", "Chronic diseases (like kidney disease)", "Blood loss (from injury or menstruation)", "Bone marrow problems"],
        commonTreatments: ["Dietary changes to include more iron-rich foods", "Treating the underlying cause of blood loss or disease"],
        medicines: ["Iron supplements", "Vitamin B12 shots or supplements", "Folic acid supplements", "Medications to stimulate red blood cell production"],
        prevention: ["Eating a balanced diet rich in iron, folate, and vitamin B12", "Managing chronic conditions", "Taking supplements as advised by a doctor"]
    },
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "Depression",
        description: "A mood disorder that causes a persistent feeling of sadness and loss of interest. Also called major depressive disorder or clinical depression, it affects how you feel, think and behave and can lead to a variety of emotional and physical problems.",
        symptoms: ["Persistent sad, anxious, or 'empty' mood", "Loss of interest or pleasure in hobbies and activities", "Feelings of hopelessness or pessimism", "Difficulty concentrating, remembering, or making decisions", "Changes in appetite or weight", "Sleep disturbances (insomnia or oversleeping)", "Thoughts of death or suicide"],
        causes: ["Brain chemistry and hormones", "Genetic predisposition", "Life events (trauma, stress)", "Certain medical conditions", "Substance abuse"],
        commonTreatments: ["Psychotherapy (talk therapy)", "Cognitive Behavioral Therapy (CBT)", "Lifestyle changes (exercise, diet, sleep)", "Support groups"],
        medicines: ["Selective serotonin reuptake inhibitors (SSRIs)", "Serotonin-norepinephrine reuptake inhibitors (SNRIs)", "Tricyclic antidepressants", "Atypical antidepressants"],
        prevention: ["Managing stress", "Building a strong social support network", "Seeking early treatment for symptoms", "Maintaining a healthy lifestyle"]
    },
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "Allergic Rhinitis (Hay Fever)",
        description: "An allergic response causing cold-like signs and symptoms, such as a runny nose, itchy eyes, congestion, sneezing and sinus pressure. It is caused by an overreaction of the immune system to allergens in the air.",
        symptoms: ["Sneezing", "Runny or stuffy nose", "Itchy or watery eyes", "Itchy nose, roof of mouth or throat", "Postnasal drip", "Cough", "Fatigue"],
        causes: ["Pollen from trees, grass, and weeds", "Dust mites", "Mold spores", "Pet dander (skin flakes)", "Cockroaches"],
        commonTreatments: ["Avoiding allergens", "Using a nasal saline rinse", "Keeping windows closed during high pollen seasons", "Using air purifiers with HEPA filters"],
        medicines: ["Antihistamines (oral or nasal spray)", "Nasal corticosteroid sprays", "Decongestants", "Leukotriene modifiers", "Allergy shots (immunotherapy)"],
        prevention: ["Monitor pollen counts and stay indoors on high-pollen days", "Use allergen-proof covers on pillows and mattresses", "Wash bedding frequently in hot water", "Keep humidity low to prevent mold"]
    },
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "COVID-19 (Coronavirus)",
      description: "An infectious disease caused by the SARS-CoV-2 virus. It primarily affects the respiratory system and can range from mild symptoms to severe illness and death.",
      symptoms: ["Fever or chills", "Cough", "Shortness of breath or difficulty breathing", "Fatigue", "Muscle or body aches", "New loss of taste or smell", "Sore throat"],
      causes: ["Infection with the SARS-CoV-2 virus", "Spread through respiratory droplets from an infected person's coughs, sneezes, or speech", "Touching contaminated surfaces then touching the face"],
      commonTreatments: ["Rest and hydration", "Isolation to prevent spread", "Monitoring oxygen levels", "Hospitalization for severe cases, possibly with mechanical ventilation"],
      medicines: ["Antiviral drugs (e.g., Paxlovid, Remdesivir)", "Over-the-counter medicines for symptom relief (e.g., acetaminophen, ibuprofen)", "Corticosteroids (like dexamethasone) for severe cases"],
      prevention: ["Vaccination", "Frequent hand washing", "Wearing masks in crowded areas", "Maintaining physical distance", "Good ventilation of indoor spaces"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "Human Immunodeficiency Virus (HIV)",
      description: "A virus that attacks the body's immune system, specifically the CD4 cells (T cells). If left untreated, HIV can lead to Acquired Immunodeficiency Syndrome (AIDS).",
      symptoms: ["Flu-like symptoms within 2-4 weeks of infection (fever, sore throat, fatigue)", "Later stages: rapid weight loss, recurring fever, extreme tiredness", "Swollen lymph glands", "Sores of the mouth, anus, or genitals"],
      causes: ["Transmission through bodily fluids like blood, semen, rectal fluids, vaginal fluids, and breast milk", "Unprotected sexual contact", "Sharing needles", "From mother to child during pregnancy or breastfeeding"],
      commonTreatments: ["Antiretroviral therapy (ART) - a combination of HIV medicines", "Regular monitoring of viral load and CD4 count"],
      medicines: ["Antiretroviral drugs (various classes like NRTIs, NNRTIs, PIs)", "Pre-exposure prophylaxis (PrEP) for prevention in high-risk individuals"],
      prevention: ["Using condoms correctly during sex", "Not sharing needles", "Using PrEP and PEP (post-exposure prophylaxis)", "Treatment as Prevention (TasP) - people with an undetectable viral load cannot transmit HIV"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "Human Papillomavirus (HPV)",
      description: "The most common sexually transmitted infection (STI). Many people with HPV don't develop any symptoms but can still infect others. Some types can cause genital warts, while high-risk types can cause various cancers.",
      symptoms: ["Often asymptomatic", "Genital warts (small bumps or groups of bumps in the genital area)", "Common warts on hands or feet", "In some cases, can lead to cervical, anal, or throat cancer"],
      causes: ["Spread through vaginal, anal, or oral sex with someone who has the virus", "Can be passed even when an infected person has no signs or symptoms"],
      commonTreatments: ["No cure for the virus itself; warts can be treated by a doctor (topical creams, cryotherapy)", "Regular screenings (Pap tests) to detect cervical changes early"],
      medicines: ["Topical medications for wart removal (e.g., Imiquimod, Podofilox)", "No antiviral medication for the virus itself"],
      prevention: ["HPV vaccination (highly effective)", "Using condoms during sex", "Routine cervical cancer screening"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "Herpes Simplex Virus (HSV)",
      description: "A common virus that causes sores on the genitals and/or mouth. HSV-1 typically causes oral herpes (cold sores), and HSV-2 typically causes genital herpes, but both can cause sores in either area.",
      symptoms: ["Painful sores or blisters at the site of infection (mouth, genitals, rectum)", "Tingling, itching, or burning sensation before sores appear", "Flu-like symptoms during the initial outbreak (fever, body aches)", "Recurrent outbreaks are common but usually less severe"],
      causes: ["Spread through direct contact with sores", "HSV-1 is often spread through saliva (kissing)", "HSV-2 is primarily spread through sexual contact"],
      commonTreatments: ["No cure, but treatment can manage symptoms and reduce outbreaks", "Keeping sores clean and dry"],
      medicines: ["Antiviral medications (e.g., Acyclovir, Valacyclovir) to shorten and prevent outbreaks"],
      prevention: ["Avoiding direct contact with sores", "Using condoms (reduces but does not eliminate risk)", "Daily antiviral medication can reduce the risk of transmission to partners"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "Varicella-Zoster Virus (Chickenpox & Shingles)",
      description: "The virus that causes two distinct conditions. The primary infection results in chickenpox, a highly contagious illness with an itchy rash. The virus then remains dormant and can reactivate later in life to cause shingles (herpes zoster), a painful rash.",
      symptoms: ["Chickenpox: Itchy rash with fluid-filled blisters, fever, tiredness, headache", "Shingles: Painful, blistering rash on one side of the body, burning or tingling pain, fever, headache"],
      causes: ["Primary infection (chickenpox) spread through airborne droplets or contact with blisters", "Reactivation of the dormant virus (shingles), often due to a weakened immune system or age"],
      commonTreatments: ["Chickenpox: Symptom relief with oatmeal baths, calamine lotion, and fever reducers", "Shingles: Antiviral medication to reduce severity and duration"],
      medicines: ["Antiviral drugs (Acyclovir, Valacyclovir) for shingles", "Pain relievers and topical creams for shingles pain", "Antihistamines for chickenpox itch"],
      prevention: ["Chickenpox vaccine for children and adults", "Shingles vaccine (Shingrix) for adults over 50"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "Measles",
      description: "A highly contagious viral infection that is a serious illness for small children but is easily preventable by a vaccine. It causes a characteristic red rash all over the body.",
      symptoms: ["High fever", "Cough", "Runny nose", "Red, watery eyes (conjunctivitis)", "Koplik spots (tiny white spots inside the mouth)", "A widespread skin rash made of large, flat blotches"],
      causes: ["Infection with the measles virus (morbillivirus)", "Spread through the air by respiratory droplets produced from coughing or sneezing"],
      commonTreatments: ["No specific treatment", "Supportive care including rest, fluids, and fever control", "Vitamin A supplements may be recommended"],
      medicines: ["Fever reducers (acetaminophen or ibuprofen)", "Antibiotics may be prescribed if secondary bacterial infections like pneumonia develop"],
      prevention: ["MMR (measles, mumps, and rubella) vaccine is highly effective"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "Ebola Virus Disease",
      description: "A rare but severe and often fatal illness in humans. The virus is transmitted to people from wild animals and spreads in the human population through human-to-human transmission.",
      symptoms: ["Sudden onset of fever, fatigue, muscle pain, headache, and sore throat", "Followed by vomiting, diarrhea, rash", "Impaired kidney and liver function", "In some cases, both internal and external bleeding"],
      causes: ["Contact with blood, secretions, organs or other bodily fluids of infected people or animals (like fruit bats, chimpanzees, gorillas)", "Contact with contaminated surfaces and materials"],
      commonTreatments: ["Supportive care with rehydration (oral or intravenous fluids)", "Symptomatic treatment in an intensive care unit", "Isolation to prevent spread"],
      medicines: ["Two monoclonal antibody treatments (Inmazeb and Ebanga) have been approved for treatment."],
      prevention: ["Avoiding contact with infected individuals and animals", "Strict infection control practices in healthcare settings", "Safe burial practices", "Ebola vaccine (Ervebo)"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "Zika Virus",
      description: "A viral infection spread primarily by Aedes mosquitoes. While often causing mild or no symptoms, it is a major public health concern due to its link to microcephaly and other congenital abnormalities in infants born to infected mothers.",
      symptoms: ["Often asymptomatic", "Mild fever, rash, conjunctivitis (red eyes)", "Muscle and joint pain, headache", "Symptoms usually last for 2-7 days"],
      causes: ["Bite from an infected Aedes species mosquito", "Transmission from mother to fetus during pregnancy", "Sexual transmission"],
      commonTreatments: ["No specific treatment", "Rest, fluids, and symptomatic relief"],
      medicines: ["Pain and fever reducers like acetaminophen", "Avoid aspirin and NSAIDs until dengue is ruled out to reduce bleeding risk"],
      prevention: ["Preventing mosquito bites (using repellent, wearing long sleeves)", "Eliminating mosquito breeding sites (standing water)", "Using condoms to prevent sexual transmission", "No vaccine is currently available"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "Rabies",
      description: "A deadly viral disease that affects the central nervous system. It is transmitted from the saliva of infected animals, typically through a bite. It is almost always fatal once clinical symptoms appear.",
      symptoms: ["Early symptoms: fever, headache, general weakness or discomfort", "Progresses to: insomnia, anxiety, confusion, slight or partial paralysis, excitation, hallucinations, agitation, hypersalivation, difficulty swallowing, and hydrophobia (fear of water)"],
      causes: ["Transmission through the saliva of an infected animal via a bite or scratch", "Common carriers include dogs, bats, raccoons, skunks, and foxes"],
      commonTreatments: ["No effective treatment once symptoms begin", "Post-exposure prophylaxis (PEP) is crucial and highly effective if given promptly after exposure"],
      medicines: ["Post-exposure prophylaxis (PEP) includes a dose of human rabies immune globulin (HRIG) and a series of rabies vaccine injections"],
      prevention: ["Vaccinating pets (especially dogs)", "Avoiding contact with wild animals", "Pre-exposure vaccination for people in high-risk occupations (e.g., veterinarians)", "Seeking immediate medical care after any animal bite"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "Hepatitis B",
      description: "A viral infection that attacks the liver and can cause both acute and chronic disease. It is transmitted through contact with the blood or other body fluids of an infected person.",
      symptoms: ["Often asymptomatic in the acute phase", "Fatigue, poor appetite, stomach pain, nausea, and jaundice (yellowing of the skin and eyes)", "Chronic infection can lead to cirrhosis or liver cancer"],
      causes: ["Contact with infected blood or bodily fluids", "Unprotected sex", "Sharing needles", "From an infected mother to her baby at birth"],
      commonTreatments: ["Acute infection: Supportive care", "Chronic infection: Regular monitoring for signs of liver disease and treatment to slow disease progression"],
      medicines: ["Antiviral medications (e.g., Tenofovir, Entecavir) for chronic hepatitis B", "Interferon injections"],
      prevention: ["Hepatitis B vaccine is highly effective", "Using condoms", "Not sharing needles or personal items like razors or toothbrushes"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "Smallpox",
      description: "A devastating and highly contagious infectious disease caused by the variola virus. It was one of the deadliest diseases known to humans but was successfully eradicated globally in 1980 through a worldwide vaccination campaign.",
      symptoms: ["High fever, fatigue, head and body aches", "Characteristic rash of fluid-filled pustules covering the entire body", "Pustules leave deep, pitted scars (pockmarks)", "Vomiting and diarrhea"],
      causes: ["Infection with the variola virus", "Spread through direct contact with an infected person's saliva or skin sores", "Spread through contaminated objects like bedding or clothing"],
      commonTreatments: ["No cure existed during its prevalence", "Supportive care focusing on hydration and nutrition", "Isolation of patients to prevent spread", "Managing secondary bacterial infections"],
      medicines: ["No specific antiviral was widely available", "Antivirals like Tecovirimat were developed after eradication", "Antibiotics for secondary infections"],
      prevention: ["Vaccination with the vaccinia virus (cowpox) provided immunity", "The global vaccination campaign was the key to eradication"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "Spanish Flu (1918 Influenza Pandemic)",
      description: "An unusually deadly influenza pandemic caused by an H1N1 influenza A virus. Lasting from 1918 to 1920, it infected about 500 million people and caused an estimated 50 million deaths worldwide, making it one of the deadliest pandemics in human history.",
      symptoms: ["Sudden high fever", "Severe cough and sore throat", "Extreme body aches and headache", "Severe fatigue", "Secondary bacterial pneumonia, which was often the cause of death", "Cytokine storm leading to rapid respiratory failure, especially in young adults"],
      causes: ["H1N1 influenza A virus", "Highly contagious and spread through respiratory droplets from coughing and sneezing", "Close quarters during World War I facilitated its rapid spread"],
      commonTreatments: ["No effective antiviral treatments were available at the time", "Care was limited to supportive measures like rest and fluids", "Isolation hospitals and quarantines were used to slow the spread"],
      medicines: ["No influenza-specific antivirals", "Aspirin was sometimes used for symptoms", "Antibiotics for secondary bacterial pneumonia were not yet discovered"],
      prevention: ["Public health measures: quarantine, hygiene, use of disinfectants", "Limiting public gatherings and closing schools/theaters", "No flu vaccine existed at the time"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "Polio (Poliomyelitis)",
      description: "A disabling and life-threatening disease caused by the poliovirus. The virus spreads from person to person and can invade an infected person’s brain and spinal cord, causing paralysis. Thanks to global vaccination efforts, it is now nearly eradicated.",
      symptoms: ["Most infections (about 72%) are asymptomatic", "Some experience flu-like symptoms (sore throat, fever, fatigue)", "A smaller proportion can develop meningitis", "Less than 1% of cases result in permanent paralysis (paralytic polio)"],
      causes: ["Infection with the poliovirus", "Enters the body through the mouth, usually from hands contaminated with the stool of an infected person", "Can also spread through contaminated water or food"],
      commonTreatments: ["No cure exists for polio", "Supportive care: rest, pain relievers, physical therapy for muscle weakness", "Mechanical ventilators ('iron lungs') were used for patients with paralyzed breathing muscles"],
      medicines: ["Pain relievers (e.g., ibuprofen)", "No antiviral medication can cure polio"],
      prevention: ["Inactivated Poliovirus Vaccine (IPV) given as an injection", "Oral Poliovirus Vaccine (OPV)", "Widespread vaccination is the key to eradication"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "Stroke",
        description: "A medical emergency that occurs when the blood supply to part of the brain is interrupted or reduced, preventing brain tissue from getting oxygen and nutrients. Brain cells begin to die in minutes.",
        symptoms: ["Trouble speaking and understanding what others are saying", "Paralysis or numbness of the face, arm or leg", "Problems seeing in one or both eyes", "Sudden severe headache", "Trouble walking"],
        causes: ["Ischemic stroke (blocked artery)", "Hemorrhagic stroke (leaking or bursting of a blood vessel)", "High blood pressure", "High cholesterol", "Smoking", "Obesity", "Diabetes"],
        commonTreatments: ["Clot-busting drugs (tPA)", "Endovascular procedures to remove clots", "Surgery for hemorrhagic strokes", "Rehabilitation therapy"],
        medicines: ["Thrombolytics (e.g., Alteplase)", "Antiplatelet drugs (e.g., Aspirin)", "Anticoagulants (e.g., Warfarin)", "Blood pressure medications"],
        prevention: ["Controlling high blood pressure", "Lowering cholesterol", "Quitting smoking", "Managing diabetes", "Maintaining a healthy weight", "Regular exercise"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "Pneumonia",
        description: "An infection that inflames the air sacs in one or both lungs. The air sacs may fill with fluid or pus, causing cough with phlegm or pus, fever, chills, and difficulty breathing.",
        symptoms: ["Chest pain when you breathe or cough", "Confusion or changes in mental awareness (in adults age 65 and older)", "Cough which may produce phlegm", "Fatigue", "Fever, sweating and shaking chills", "Shortness of breath", "Nausea, vomiting or diarrhea"],
        causes: ["Bacteria (e.g., Streptococcus pneumoniae)", "Viruses (e.g., influenza, COVID-19)", "Fungi", "Aspiration of food or liquid into the lungs"],
        commonTreatments: ["Antibiotics for bacterial pneumonia", "Antiviral medications for viral pneumonia", "Rest", "Fluid intake"],
        medicines: ["Antibiotics (e.g., Amoxicillin, Azithromycin)", "Antivirals (e.g., Oseltamivir)", "Fever reducers (e.g., Acetaminophen)", "Cough medicine"],
        prevention: ["Vaccination (pneumococcal vaccine, flu vaccine)", "Good hygiene (hand washing)", "Not smoking", "Keeping your immune system strong"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "Kidney Stones",
        description: "Hard deposits made of minerals and salts that form inside the kidneys. They can affect any part of the urinary tract — from your kidneys to your bladder.",
        symptoms: ["Severe, sharp pain in the side and back, below the ribs", "Pain that radiates to the lower abdomen and groin", "Pain or burning sensation while urinating", "Pink, red or brown urine", "Cloudy or foul-smelling urine", "Nausea and vomiting", "Persistent need to urinate"],
        causes: ["High levels of calcium, oxalate, and uric acid in urine", "Not drinking enough water", "Obesity", "Certain diets and medical conditions"],
        commonTreatments: ["Drinking water to flush out the stone", "Pain relievers", "Medical procedures like shock wave lithotripsy or ureteroscopy to break up or remove larger stones"],
        medicines: ["Pain relievers (e.g., Ibuprofen)", "Alpha blockers (e.g., Tamsulosin) to relax the ureter muscles", "Diuretics"],
        prevention: ["Drinking plenty of water", "Eating fewer oxalate-rich foods", "Choosing a diet low in salt and animal protein", "Using preventive medications"]
    }
  },
];

const arData: StructuredSearchResultData[] = [
  {
    type: 'structured',
    medicalInfo: {
      name: "سرطان الرئة",
      description: "نوع من السرطان يبدأ في الرئتين. وهو السبب الرئيسي للوفيات الناجمة عن السرطان في جميع أنحاء العالم. المدخنون هم الأكثر عرضة لخطر الإصابة بسرطان الرئة، على الرغم من أنه يمكن أن يحدث أيضًا لدى الأشخاص الذين لم يدخنوا مطلقًا.",
      symptoms: ["سعال جديد لا يزول", "سعال مصحوب بدم، حتى لو بكمية قليلة", "ضيق في التنفس", "ألم في الصدر", "بحة في الصوت", "فقدان الوزن دون محاولة", "ألم في العظام", "صداع"],
      causes: ["تدخين التبغ (السبب الرئيسي)", "التعرض للتدخين السلبي", "التعرض لغاز الرادون", "التعرض للأسبستوس والمواد المسرطنة الأخرى", "تاريخ عائلي للإصابة بسرطان الرئة", "تلوث الهواء"],
      commonTreatments: ["الجراحة لإزالة الأنسجة السرطانية", "العلاج الكيميائي لقتل الخلايا السرطانية", "العلاج الإشعاعي لتقليص الأورام", "العلاج الدوائي الموجه", "العلاج المناعي لمساعدة الجهاز المناعي على محاربة السرطان"],
      medicines: ["أدوية العلاج الكيميائي (مثل سيسبلاتين، كاربوبلاتين)", "أدوية العلاج الموجه (مثل إرلوتينيب، كريزوتينيب)", "أدوية العلاج المناعي (مثل بيمبروليزوماب، نيفولوماب)"],
      prevention: ["لا تدخن أو أقلع عن التدخين", "تجنب التدخين السلبي", "افحص منزلك للكشف عن الرادون", "تجنب المواد المسرطنة في العمل", "تناول نظامًا غذائيًا غنيًا بالفواكه والخضروات", "تمرن معظم أيام الأسبوع"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "السكري من النوع الثاني",
      description: "حالة مزمنة تؤثر على طريقة معالجة الجسم لسكر الدم (الجلوكوز). في حالة السكري من النوع الثاني، إما أن الجسم لا ينتج كمية كافية من الأنسولين، أو أنه يقاوم الأنسولين.",
      symptoms: ["زيادة العطش", "التبول المتكرر", "زيادة الجوع", "فقدان الوزن غير المقصود", "التعب", "عدم وضوح الرؤية", "بطء التئام الجروح"],
      causes: ["الوراثة والتاريخ العائلي", "السمنة أو زيادة الوزن", "قلة النشاط البدني", "مقاومة الأنسولين", "العمر (فوق 45)"],
      commonTreatments: ["الأكل الصحي وإدارة النظام الغذائي", "النشاط البدني المنتظم", "مراقبة سكر الدم", "برامج إنقاص الوزن"],
      medicines: ["ميتفورمين", "سلفونيل يوريا", "مثبطات DPP-4", "منبهات مستقبلات GLP-1", "العلاج بالأنسولين"],
      prevention: ["الحفاظ على وزن صحي", "تناول نظام غذائي متوازن غني بالفواكه والخضروات", "ممارسة التمارين الرياضية بانتظام (150 دقيقة على الأقل أسبوعيًا)", "تجنب التدخين والكحول المفرط", "الفحوصات الصحية المنتظمة"]
    },
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "ارتفاع ضغط الدم",
      description: "حالة شائعة تكون فيها قوة الدم طويلة الأمد على جدران الشرايين عالية بما يكفي لتسبب مشاكل صحية في النهاية، مثل أمراض القلب.",
      symptoms: ["غالبًا لا تظهر له أعراض (القاتل الصامت)", "صداع", "ضيق في التنفس", "نزيف في الأنف", "دوار", "ألم في الصدر"],
      causes: ["الوراثة", "نظام غذائي عالي الملح", "قلة النشاط البدني", "السمنة", "الإجهاد", "التقدم في السن", "أمراض الكلى"],
      commonTreatments: ["تغييرات في نمط الحياة (النظام الغذائي، التمارين)", "تقنيات إدارة الإجهاد", "تقليل تناول الملح", "الحد من الكحول"],
      medicines: ["مدرات البول", "مثبطات الإنزيم المحول للأنجيوتنسين (ACE)", "حاصرات مستقبلات الأنجيوتنسين II (ARBs)", "حاصرات قنوات الكالسيوم", "حاصرات بيتا"],
      prevention: ["تناول نظام غذائي صحي للقلب", "الحفاظ على وزن صحي", "ممارسة النشاط البدني بانتظام", "عدم التدخين", "الحد من استهلاك الكحول", "إدارة الإجهاد"]
    },
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "الربو",
        description: "مرض مزمن يصيب المسالك الهوائية في الرئتين. هذه المسالك الهوائية، أو القصبات الهوائية، تسمح للهواء بالدخول والخروج من الرئتين. إذا كنت مصابًا بالربو، تكون مسالكك الهوائية ملتهبة دائمًا ويمكن أن تصبح أكثر تورمًا عندما يثير شيء ما أعراضك.",
        symptoms: ["ضيق في التنفس", "ضيق أو ألم في الصدر", "أزيز عند الزفير", "صعوبة في النوم بسبب ضيق التنفس أو السعال أو الأزيز", "نوبات سعال أو أزيز تزداد سوءًا بسبب فيروس تنفسي"],
        causes: ["الاستعداد الوراثي", "الحساسية (حبوب اللقاح، عث الغبار، العفن)", "التهابات الجهاز التنفسي", "ملوثات الهواء والمهيجات (مثل الدخان)", "التمارين الرياضية", "الهواء البارد"],
        commonTreatments: ["استخدام جهاز الاستنشاق (موسع قصبي)", "تجنب المحفزات المعروفة", "وضع خطة عمل للربو مع الطبيب", "أدوية السيطرة طويلة الأمد"],
        medicines: ["الكورتيكوستيرويدات المستنشقة (للسيطرة طويلة الأمد)", "معدلات الليكوترين", "ناهضات بيتا طويلة المفعول (LABAs)", "ناهضات بيتا قصيرة المفعول (أجهزة استنشاق الإنقاذ مثل ألبوتيرول)", "أجهزة الاستنشاق المركبة"],
        prevention: ["تحديد وتجنب محفزات الربو", "الحصول على لقاحات الأنفلونزا والالتهاب الرئوي", "مراقبة تنفسك", "تناول الدواء كما هو موصوف", "العمل مع طبيبك لإدارة حالتك"]
    },
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "الأنفلونزا",
        description: "مرض تنفسي معدٍ تسببه فيروسات الأنفلونزا التي تصيب الأنف والحلق وأحيانًا الرئتين. يمكن أن يسبب مرضًا خفيفًا إلى شديد، وفي بعض الأحيان يمكن أن يؤدي إلى الوفاة.",
        symptoms: ["حمى أو الشعور بالحمى / قشعريرة", "سعال", "التهاب الحلق", "سيلان أو انسداد الأنف", "آلام في العضلات أو الجسم", "صداع", "تعب (إرهاق)"],
        causes: ["فيروسات الأنفلونزا (الأنواع أ، ب، ج)", "تنتشر عن طريق الرذاذ التنفسي من السعال أو العطس", "لمس الأسطح الملوثة"],
        commonTreatments: ["الراحة والإكثار من السوائل", "الأدوية المتاحة دون وصفة طبية لتخفيف الأعراض", "تجنب الاتصال بالآخرين لمنع الانتشار"],
        medicines: ["الأدوية المضادة للفيروسات (مثل أوسيلتاميفير، زاناميفير)", "مسكنات الألم (مثل إيبوبروفين، أسيتامينوفين)", "مزيلات الاحتقان ومثبطات السعال"],
        prevention: ["لقاح الأنفلونزا الموسمي السنوي", "غسل اليدين بشكل متكرر", "تجنب لمس العينين والأنف والفم", "تغطية الفم والأنف عند السعال والعطس", "البقاء في المنزل عند المرض"]
    },
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "الصداع النصفي",
        description: "نوع من الصداع يمكن أن يسبب ألمًا نابضًا شديدًا أو إحساسًا بالخفقان، عادةً في جانب واحد من الرأس. وغالبًا ما يكون مصحوبًا بالغثيان والقيء وحساسية شديدة للضوء والصوت.",
        symptoms: ["صداع نابض شديد، غالبًا في جانب واحد", "غثيان وقيء", "حساسية للضوء (رهاب الضوء)", "حساسية للصوت (رهاب الصوت)", "اضطرابات بصرية (هالة)", "دوار أو دوخة"],
        causes: ["عوامل وراثية", "التغيرات الهرمونية لدى النساء", "أطعمة ومشروبات معينة (مثل الأجبان المعتقة، الكحول)", "الإجهاد", "تغيرات في أنماط النوم", "روائح قوية أو أضواء ساطعة"],
        commonTreatments: ["الراحة في غرفة مظلمة وهادئة", "وضع كمادات باردة أو دافئة على الرأس", "الحفاظ على رطوبة الجسم", "تحديد وتجنب المحفزات"],
        medicines: ["مسكنات الألم المتاحة دون وصفة طبية (مثل إيبوبروفين، نابروكسين)", "التريبتانات (مثل سوماتريبتان)", "مضادات CGRP", "الأدوية المضادة للغثيان", "الأدوية الوقائية (مثل حاصرات بيتا، مضادات الاكتئاب)"],
        prevention: ["تحديد وتجنب المحفزات", "الحفاظ على جدول نوم منتظم", "تناول وجبات منتظمة", "إدارة الإجهاد من خلال تقنيات الاسترخاء", "ممارسة التمارين الرياضية بانتظام", "النظر في الأدوية الوقائية إذا كانت نوبات الصداع النصفي متكررة"]
    },
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "نزلات البرد الشائعة",
        description: "عدوى فيروسية خفيفة في الأنف والحلق، تسبب أعراضًا مثل سيلان الأنف والعطس والتهاب الحلق.",
        symptoms: ["سيلان أو انسداد الأنف", "التهاب الحلق", "سعال", "احتقان", "آلام طفيفة في الجسم أو صداع خفيف", "عطس", "حمى منخفضة الدرجة"],
        causes: ["فيروسات الأنف (الأكثر شيوعًا)", "الانتشار عبر الرذاذ المحمول جوًا", "ملامسة الأسطح الملوثة", "ضعف جهاز المناعة"],
        commonTreatments: ["الراحة والإكثار من السوائل", "الغرغرة بالماء المالح", "استخدام جهاز ترطيب الهواء", "تخفيف الأعراض بالمنتجات المتاحة دون وصفة طبية"],
        medicines: ["مزيلات الاحتقان", "مسكنات الألم (مثل الأسيتامينوفين والإيبوبروفين)", "مثبطات السعال", "مضادات الهيستامين"],
        prevention: ["غسل اليدين بشكل متكرر", "تجنب لمس وجهك", "تنظيف وتطهير الأسطح", "تجنب الاتصال الوثيق مع المرضى"]
    },
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "التهاب المعدة والأمعاء (إنفلونزا المعدة)",
        description: "التهاب في المعدة والأمعاء، يحدث عادة بسبب عدوى فيروسية أو بكتيرية. يؤدي إلى الإسهال والقيء وآلام في البطن.",
        symptoms: ["إسهال", "قيء", "غثيان", "تقلصات وألم في المعدة", "آلام عضلية أو صداع في بعض الأحيان", "حمى منخفضة الدرجة"],
        causes: ["الفيروسات (مثل نوروفيروس وروتافيروس)", "البكتيريا (مثل الإشريكية القولونية والسالمونيلا)", "الطعام أو الماء الملوث", "الاتصال بشخص مصاب"],
        commonTreatments: ["الإماهة الفموية (شرب الكثير من السوائل)", "إراحة المعدة (تجنب الأطعمة الصلبة في البداية)", "إعادة إدخال الأطعمة الخفيفة تدريجيًا", "تجنب منتجات الألبان والكافيين والكحول"],
        medicines: ["أدوية مضادة للإسهال (تستخدم بحذر)", "أدوية مضادة للغثيان", "مسكنات الألم للحمى والآلام", "مضادات حيوية (فقط إذا كانت بكتيرية)"],
        prevention: ["غسل اليدين بشكل متكرر، خاصة بعد استخدام الحمام وقبل الأكل", "التعامل مع الطعام وطهيه بشكل صحيح", "تجنب الطعام والماء الملوث", "التطعيم ضد فيروس الروتا للرضع"]
    },
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "فقر الدم (الأنيميا)",
        description: "حالة تفتقر فيها إلى ما يكفي من خلايا الدم الحمراء السليمة لنقل الأكسجين الكافي إلى أنسجة الجسم. يمكن أن يجعلك فقر الدم تشعر بالتعب والضعف.",
        symptoms: ["تعب", "ضعف", "بشرة شاحبة أو صفراء", "ضيق في التنفس", "دوار أو دوخة", "برودة اليدين والقدمين", "صداع"],
        causes: ["نقص الحديد (الأكثر شيوعًا)", "نقص فيتامين ب12", "الأمراض المزمنة (مثل أمراض الكلى)", "فقدان الدم (بسبب إصابة أو دورة شهرية)", "مشاكل في نخاع العظم"],
        commonTreatments: ["تغييرات غذائية لتشمل المزيد من الأطعمة الغنية بالحديد", "علاج السبب الأساسي لفقدان الدم أو المرض"],
        medicines: ["مكملات الحديد", "حقن أو مكملات فيتامين ب12", "مكملات حمض الفوليك", "أدوية لتحفيز إنتاج خلايا الدم الحمراء"],
        prevention: ["تناول نظام غذائي متوازن غني بالحديد والفولات وفيتامين ب12", "إدارة الحالات المزمنة", "تناول المكملات الغذائية حسب نصيحة الطبيب"]
    },
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "الاكتئاب",
        description: "اضطراب مزاجي يسبب شعورًا مستمرًا بالحزن وفقدان الاهتمام. يُطلق عليه أيضًا اضطراب اكتئابي كبير أو اكتئاب سريري، وهو يؤثر على شعورك وتفكيرك وسلوكك ويمكن أن يؤدي إلى مجموعة متنوعة من المشاكل العاطفية والجسدية.",
        symptoms: ["مزاج حزين أو قلق أو 'فارغ' مستمر", "فقدان الاهتمام أو المتعة في الهوايات والأنشطة", "مشاعر اليأس أو التشاؤم", "صعوبة في التركيز أو التذكر أو اتخاذ القرارات", "تغيرات في الشهية أو الوزن", "اضطرابات النوم (أرق أو نوم مفرط)", "أفكار عن الموت أو الانتحار"],
        causes: ["كيمياء الدماغ والهرمونات", "الاستعداد الوراثي", "أحداث الحياة (صدمة، إجهاد)", "حالات طبية معينة", "تعاطي المخدرات"],
        commonTreatments: ["العلاج النفسي (العلاج بالكلام)", "العلاج السلوكي المعرفي (CBT)", "تغييرات في نمط الحياة (تمارين، نظام غذائي، نوم)", "مجموعات الدعم"],
        medicines: ["مثبطات امتصاص السيروتونين الانتقائية (SSRIs)", "مثبطات امتصاص السيروتونين والنورإبينفرين (SNRIs)", "مضادات الاكتئاب ثلاثية الحلقات", "مضادات الاكتئاب غير النمطية"],
        prevention: ["إدارة الإجهاد", "بناء شبكة دعم اجتماعي قوية", "البحث عن علاج مبكر للأعراض", "الحفاظ على نمط حياة صحي"]
    },
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "التهاب الأنف التحسسي (حمى القش)",
        description: "استجابة تحسسية تسبب علامات وأعراضًا تشبه نزلات البرد، مثل سيلان الأنف، وحكة العينين، والاحتقان، والعطس، وضغط الجيوب الأنفية. تحدث بسبب رد فعل مفرط من جهاز المناعة لمسببات الحساسية في الهواء.",
        symptoms: ["عطس", "سيلان أو انسداد الأنف", "حكة أو دموع في العينين", "حكة في الأنف أو سقف الفم أو الحلق", "التنقيط الأنفي الخلفي", "سعال", "تعب"],
        causes: ["حبوب اللقاح من الأشجار والأعشاب والحشائش", "عث الغبار", "جراثيم العفن", "وبر الحيوانات الأليفة (رقائق الجلد)", "الصراصير"],
        commonTreatments: ["تجنب مسببات الحساسية", "استخدام غسول الأنف الملحي", "إبقاء النوافذ مغلقة خلال مواسم حبوب اللقاح المرتفعة", "استخدام أجهزة تنقية الهواء بفلاتر HEPA"],
        medicines: ["مضادات الهيستامين (فموية أو بخاخ أنفي)", "بخاخات الكورتيكوستيرويد الأنفية", "مزيلات الاحتقان", "معدلات الليكوترين", "حقن الحساسية (العلاج المناعي)"],
        prevention: ["مراقبة أعداد حبوب اللقاح والبقاء في الداخل في الأيام التي ترتفع فيها", "استخدام أغطية واقية من مسببات الحساسية على الوسائد والمراتب", "غسل الفراش بشكل متكرر بالماء الساخن", "الحفاظ على رطوبة منخفضة لمنع العفن"]
    },
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "كوفيد-19 (فيروس كورونا)",
      description: "مرض معد يسببه فيروس سارس-كوف-2. يؤثر بشكل أساسي على الجهاز التنفسي ويمكن أن يتراوح من أعراض خفيفة إلى مرض شديد والوفاة.",
      symptoms: ["حمى أو قشعريرة", "سعال", "ضيق في التنفس أو صعوبة في التنفس", "تعب", "آلام في العضلات أو الجسم", "فقدان جديد لحاسة التذوق أو الشم", "التهاب الحلق"],
      causes: ["العدوى بفيروس سارس-كوف-2", "ينتشر عن طريق الرذاذ التنفسي من سعال أو عطس أو كلام الشخص المصاب", "لمس الأسطح الملوثة ثم لمس الوجه"],
      commonTreatments: ["الراحة والإكثار من السوائل", "العزل لمنع الانتشار", "مراقبة مستويات الأكسجين", "العلاج في المستشفى للحالات الشديدة، وقد يتطلب الأمر تهوية ميكانيكية"],
      medicines: ["الأدوية المضادة للفيروسات (مثل باكسلوفيد، ريمديسيفير)", "الأدوية المتاحة دون وصفة طبية لتخفيف الأعراض (مثل أسيتامينوفين، إيبوبروفين)", "الكورتيكوستيرويدات (مثل ديكساميثازون) للحالات الشديدة"],
      prevention: ["التطعيم", "غسل اليدين بشكل متكرر", "ارتداء الكمامات في الأماكن المزدحمة", "الحفاظ على التباعد الجسدي", "التهوية الجيدة للأماكن المغلقة"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "فيروس نقص المناعة البشرية (HIV)",
      description: "فيروس يهاجم جهاز المناعة في الجسم، وتحديداً خلايا CD4 (الخلايا التائية). إذا ترك دون علاج، يمكن أن يؤدي فيروس نقص المناعة البشرية إلى متلازمة نقص المناعة المكتسب (الإيدز).",
      symptoms: ["أعراض شبيهة بالإنفلونزا في غضون 2-4 أسابيع من العدوى (حمى، التهاب الحلق، تعب)", "المراحل المتأخرة: فقدان سريع للوزن، حمى متكررة، تعب شديد", "تورم الغدد الليمفاوية", "تقرحات في الفم أو الشرج أو الأعضاء التناسلية"],
      causes: ["ينتقل عن طريق سوائل الجسم مثل الدم والسائل المنوي وسوائل المستقيم والسوائل المهبلية وحليب الثدي", "الاتصال الجنسي غير المحمي", "مشاركة الإبر", "من الأم إلى الطفل أثناء الحمل أو الرضاعة"],
      commonTreatments: ["العلاج المضاد للفيروسات القهقرية (ART) - مزيج من أدوية فيروس نقص المناعة البشرية", "المراقبة المنتظمة للحمل الفيروسي وعدد خلايا CD4"],
      medicines: ["الأدوية المضادة للفيروسات القهقرية (فئات مختلفة)", "العلاج الوقائي قبل التعرض (PrEP) للوقاية لدى الأفراد المعرضين لخطر كبير"],
      prevention: ["استخدام الواقي الذكري بشكل صحيح أثناء ممارسة الجنس", "عدم مشاركة الإبر", "استخدام PrEP و PEP (العلاج الوقائي بعد التعرض)", "العلاج كوسيلة للوقاية (TasP)"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "فيروس الورم الحليمي البشري (HPV)",
      description: "أكثر أنواع العدوى المنقولة جنسياً شيوعاً. لا تظهر أعراض على كثير من المصابين بفيروس الورم الحليمي البشري لكنهم يظلون قادرين على نقل العدوى للآخرين. يمكن لبعض الأنواع أن تسبب ثآليل تناسلية، بينما يمكن للأنواع عالية الخطورة أن تسبب سرطانات مختلفة.",
      symptoms: ["غالباً بدون أعراض", "ثآليل تناسلية (نتوءات صغيرة أو مجموعات من النتوءات في المنطقة التناسلية)", "ثآليل شائعة على اليدين أو القدمين", "في بعض الحالات، يمكن أن يؤدي إلى سرطان عنق الرحم أو الشرج أو الحلق"],
      causes: ["ينتشر عن طريق الجنس المهبلي أو الشرجي أو الفموي مع شخص مصاب بالفيروس", "يمكن أن ينتقل حتى لو لم تظهر على الشخص المصاب أي علامات أو أعراض"],
      commonTreatments: ["لا يوجد علاج للفيروس نفسه؛ يمكن للطبيب علاج الثآليل (كريمات موضعية، علاج بالتبريد)", "الفحوصات المنتظمة (مثل مسحة عنق الرحم) للكشف المبكر عن التغيرات"],
      medicines: ["الأدوية الموضعية لإزالة الثآليل (مثل إيميكويمود، بودوفيلوكس)", "لا يوجد دواء مضاد للفيروسات للفيروس نفسه"],
      prevention: ["لقاح فيروس الورم الحليمي البشري (فعال للغاية)", "استخدام الواقي الذكري أثناء ممارسة الجنس", "الفحص الدوري لسرطان عنق الرحم"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "فيروس الهربس البسيط (HSV)",
      description: "فيروس شائع يسبب تقرحات على الأعضاء التناسلية و/أو الفم. يسبب HSV-1 عادةً الهربس الفموي (قروح البرد)، ويسبب HSV-2 عادةً الهربس التناسلي، لكن كلاهما يمكن أن يسبب تقرحات في أي من المنطقتين.",
      symptoms: ["تقرحات مؤلمة أو بثور في موقع العدوى (الفم، الأعضاء التناسلية، المستقيم)", "وخز أو حكة أو حرقان قبل ظهور التقرحات", "أعراض شبيهة بالإنفلونزا خلال النوبة الأولى (حمى، آلام في الجسم)", "تكرار النوبات شائع ولكنه عادة ما يكون أقل حدة"],
      causes: ["ينتشر عن طريق الاتصال المباشر بالتقرحات", "ينتشر HSV-1 غالبًا عن طريق اللعاب (التقبيل)", "ينتشر HSV-2 بشكل أساسي عن طريق الاتصال الجنسي"],
      commonTreatments: ["لا يوجد علاج شافٍ، لكن العلاج يمكنه التحكم في الأعراض وتقليل النوبات", "الحفاظ على التقرحات نظيفة وجافة"],
      medicines: ["الأدوية المضادة للفيروسات (مثل الأسيكلوفير، فالاسيكلوفير) لتقصير النوبات والوقاية منها"],
      prevention: ["تجنب الاتصال المباشر بالتقرحات", "استخدام الواقي الذكري (يقلل الخطر ولكنه لا يزيله تمامًا)", "يمكن للدواء المضاد للفيروسات اليومي أن يقلل من خطر انتقاله إلى الشركاء"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "فيروس الحماق النطاقي (جدري الماء والحزام الناري)",
      description: "الفيروس الذي يسبب حالتين مميزتين. العدوى الأولية تؤدي إلى جدري الماء، وهو مرض شديد العدوى يسبب طفحًا جلديًا مثيرًا للحكة. يبقى الفيروس بعد ذلك كامنًا ويمكن أن ينشط لاحقًا في الحياة ليسبب الحزام الناري (الهربس النطاقي)، وهو طفح جلدي مؤلم.",
      symptoms: ["جدري الماء: طفح جلدي مثير للحكة مع بثور مملوءة بالسوائل، حمى، تعب، صداع", "الحزام الناري: طفح جلدي مؤلم ومتقرح على جانب واحد من الجسم، ألم حارق أو وخز، حمى، صداع"],
      causes: ["العدوى الأولية (جدري الماء) تنتشر عن طريق الرذاذ المحمول جوًا أو ملامسة البثور", "إعادة تنشيط الفيروس الكامن (الحزام الناري)، غالبًا بسبب ضعف جهاز المناعة أو التقدم في السن"],
      commonTreatments: ["جدري الماء: تخفيف الأعراض بحمامات الشوفان، غسول الكالامين، ومخفضات الحرارة", "الحزام الناري: دواء مضاد للفيروسات لتقليل الشدة والمدة"],
      medicines: ["الأدوية المضادة للفيروسات (أسيكلوفير، فالاسيكلوفير) للحزام الناري", "مسكنات الألم والكريمات الموضعية لألم الحزام الناري", "مضادات الهيستامين لحكة جدري الماء"],
      prevention: ["لقاح جدري الماء للأطفال والبالغين", "لقاح الحزام الناري (شينجريكس) للبالغين فوق سن 50"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "الحصبة",
      description: "عدوى فيروسية شديدة العدوى تشكل مرضًا خطيرًا للأطفال الصغار ولكن يمكن الوقاية منها بسهولة عن طريق لقاح. تسبب طفحًا جلديًا أحمر مميزًا في جميع أنحاء الجسم.",
      symptoms: ["حمى شديدة", "سعال", "سيلان الأنف", "عيون حمراء دامعة (التهاب الملتحمة)", "بقع كوبليك (بقع بيضاء صغيرة داخل الفم)", "طفح جلدي واسع الانتشار يتكون من بقع كبيرة مسطحة"],
      causes: ["العدوى بفيروس الحصبة (الفيروس الحصبي)", "ينتشر في الهواء عن طريق الرذاذ التنفسي الناتج عن السعال أو العطس"],
      commonTreatments: ["لا يوجد علاج محدد", "رعاية داعمة تشمل الراحة والسوائل والتحكم في الحمى", "قد يوصى بمكملات فيتامين أ"],
      medicines: ["مخفضات الحرارة (أسيتامينوفين أو إيبوبروفين)", "قد توصف المضادات الحيوية في حالة حدوث عدوى بكتيرية ثانوية مثل الالتهاب الرئوي"],
      prevention: ["لقاح MMR (الحصبة والنكاف والحصبة الألمانية) فعال للغاية"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "مرض فيروس الإيبولا",
      description: "مرض نادر ولكنه شديد ومميت في كثير من الأحيان لدى البشر. ينتقل الفيروس إلى الناس من الحيوانات البرية وينتشر بين البشر من خلال انتقال العدوى من إنسان لآخر.",
      symptoms: ["بداية مفاجئة للحمى والتعب وآلام العضلات والصداع والتهاب الحلق", "يتبعها قيء وإسهال وطفح جلدي", "ضعف في وظائف الكلى والكبد", "في بعض الحالات، نزيف داخلي وخارجي"],
      causes: ["ملامسة دم أو إفرازات أو أعضاء أو سوائل جسم أخرى لأشخاص أو حيوانات مصابة (مثل خفافيش الفاكهة والشمبانزي والغوريلا)", "ملامسة الأسطح والمواد الملوثة"],
      commonTreatments: ["رعاية داعمة مع الإماهة (السوائل الفموية أو الوريدية)", "علاج الأعراض في وحدة العناية المركزة", "العزل لمنع الانتشار"],
      medicines: ["تمت الموافقة على علاجين بالأجسام المضادة وحيدة النسيلة (إنمازيب وإيبانجا) للعلاج."],
      prevention: ["تجنب ملامسة الأفراد والحيوانات المصابة", "ممارسات صارمة لمكافحة العدوى في أماكن الرعاية الصحية", "ممارسات الدفن الآمنة", "لقاح الإيبولا (إيرفيبو)"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "فيروس زيكا",
      description: "عدوى فيروسية تنتشر بشكل أساسي عن طريق بعوض الزاعجة. على الرغم من أنها غالبًا ما تسبب أعراضًا خفيفة أو لا تسبب أي أعراض، إلا أنها تشكل مصدر قلق كبير للصحة العامة بسبب ارتباطها بصغر الرأس والتشوهات الخلقية الأخرى لدى الرضع الذين يولدون لأمهات مصابات.",
      symptoms: ["غالباً بدون أعراض", "حمى خفيفة، طفح جلدي، التهاب الملتحمة (احمرار العين)", "آلام في العضلات والمفاصل، صداع", "تستمر الأعراض عادة لمدة 2-7 أيام"],
      causes: ["لدغة من بعوضة الزاعجة المصابة", "الانتقال من الأم إلى الجنين أثناء الحمل", "الانتقال الجنسي"],
      commonTreatments: ["لا يوجد علاج محدد", "الراحة والسوائل وتخفيف الأعراض"],
      medicines: ["مسكنات الألم والحمى مثل الأسيتامينوفين", "تجنب الأسبرين ومضادات الالتهاب غير الستيرويدية حتى يتم استبعاد حمى الضنك لتقليل خطر النزيف"],
      prevention: ["الوقاية من لدغات البعوض (استخدام طارد الحشرات، ارتداء أكمام طويلة)", "القضاء على أماكن تكاثر البعوض (المياه الراكدة)", "استخدام الواقي الذكري لمنع الانتقال الجنسي", "لا يوجد لقاح متاح حاليًا"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "داء الكلب (السعار)",
      description: "مرض فيروسي مميت يصيب الجهاز العصبي المركزي. ينتقل من لعاب الحيوانات المصابة، عادة عن طريق عضة. وهو قاتل دائمًا تقريبًا بمجرد ظهور الأعراض السريرية.",
      symptoms: ["الأعراض المبكرة: حمى، صداع، ضعف عام أو انزعاج", "يتطور إلى: أرق، قلق، ارتباك، شلل طفيف أو جزئي، هياج، هلوسة، هياج، فرط إفراز اللعاب، صعوبة في البلع، ورهاب الماء (الخوف من الماء)"],
      causes: ["ينتقل عن طريق لعاب حيوان مصاب عن طريق عضة أو خدش", "الحيوانات الحاملة الشائعة تشمل الكلاب والخفافيش والراكون والظربان والثعالب"],
      commonTreatments: ["لا يوجد علاج فعال بمجرد بدء الأعراض", "العلاج الوقائي بعد التعرض (PEP) حاسم وفعال للغاية إذا تم إعطاؤه فورًا بعد التعرض"],
      medicines: ["يشمل العلاج الوقائي بعد التعرض (PEP) جرعة من الغلوبولين المناعي لداء الكلب البشري (HRIG) وسلسلة من حقن لقاح داء الكلب"],
      prevention: ["تطعيم الحيوانات الأليفة (خاصة الكلاب)", "تجنب ملامسة الحيوانات البرية", "التطعيم قبل التعرض للأشخاص في المهن عالية الخطورة (مثل الأطباء البيطريين)", "طلب الرعاية الطبية الفورية بعد أي عضة حيوان"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "التهاب الكبد ب",
      description: "عدوى فيروسية تهاجم الكبد ويمكن أن تسبب مرضًا حادًا ومزمنًا. ينتقل عن طريق ملامسة دم أو سوائل الجسم الأخرى لشخص مصاب.",
      symptoms: ["غالبًا بدون أعراض في المرحلة الحادة", "تعب، ضعف الشهية، آلام في المعدة، غثيان، ويرقان (اصفرار الجلد والعينين)", "يمكن أن تؤدي العدوى المزمنة إلى تليف الكبد أو سرطان الكبد"],
      causes: ["ملامسة الدم أو سوائل الجسم المصابة", "الجنس غير المحمي", "مشاركة الإبر", "من الأم المصابة إلى طفلها عند الولادة"],
      commonTreatments: ["العدوى الحادة: رعاية داعمة", "العدوى المزمنة: مراقبة منتظمة لعلامات مرض الكبد وعلاج لإبطاء تقدم المرض"],
      medicines: ["الأدوية المضادة للفيروسات (مثل تينوفوفير، إنتيكافير) لالتهاب الكبد ب المزمن", "حقن الإنترفيرون"],
      prevention: ["لقاح التهاب الكبد ب فعال للغاية", "استخدام الواقي الذكري", "عدم مشاركة الإبر أو الأدوات الشخصية مثل شفرات الحلاقة أو فرشاة الأسنان"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "الجدري",
      description: "مرض معدٍ مدمر وشديد العدوى يسببه فيروس الجدري (variola virus). كان أحد أكثر الأمراض فتكًا بالبشر، ولكن تم القضاء عليه بنجاح على مستوى العالم في عام 1980 من خلال حملة تطعيم عالمية.",
      symptoms: ["حمى شديدة، إرهاق، صداع وآلام في الجسم", "طفح جلدي مميز من البثور المليئة بالسوائل يغطي الجسم بأكمله", "تترك البثور ندوبًا عميقة (آثار الجدري)", "قيء وإسهال"],
      causes: ["العدوى بفيروس الجدري", "ينتشر عن طريق الاتصال المباشر بلعاب الشخص المصاب أو تقرحاته الجلدية", "ينتشر عن طريق الأشياء الملوثة مثل الفراش أو الملابس"],
      commonTreatments: ["لم يكن هناك علاج شافٍ أثناء انتشاره", "رعاية داعمة تركز على الترطيب والتغذية", "عزل المرضى لمنع الانتشار", "معالجة الالتهابات البكتيرية الثانوية"],
      medicines: ["لم يكن هناك دواء مضاد للفيروسات متاح على نطاق واسع", "تم تطوير مضادات الفيروسات مثل Tecovirimat بعد القضاء عليه", "مضادات حيوية للعدوى الثانوية"],
      prevention: ["التطعيم بفيروس الوقس (جدري البقر) يوفر المناعة", "كانت حملة التطعيم العالمية هي مفتاح القضاء على المرض"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "الإنفلونزا الإسبانية (جائحة إنفلونزا 1918)",
      description: "جائحة إنفلونزا مميتة بشكل غير عادي سببها فيروس إنفلونزا A من نوع H1N1. استمرت من عام 1918 إلى 1920، وأصابت حوالي 500 مليون شخص وتسببت في وفاة ما يقدر بنحو 50 مليون شخص في جميع أنحاء العالم، مما يجعلها واحدة من أكثر الأوبئة فتكًا في تاريخ البشرية.",
      symptoms: ["حمى شديدة مفاجئة", "سعال حاد والتهاب في الحلق", "آلام شديدة في الجسم وصداع", "إرهاق شديد", "التهاب رئوي بكتيري ثانوي، والذي كان غالبًا سبب الوفاة", "عاصفة السيتوكين التي تؤدي إلى فشل تنفسي سريع، خاصة عند الشباب الأصحاء"],
      causes: ["فيروس إنفلونزا A من نوع H1N1", "شديد العدوى وينتشر عن طريق الرذاذ التنفسي من السعال والعطس", "سهلت الظروف المكتظة خلال الحرب العالمية الأولى انتشاره السريع"],
      commonTreatments: ["لم تكن هناك علاجات فعالة مضادة للفيروسات متاحة في ذلك الوقت", "اقتصرت الرعاية على تدابير داعمة مثل الراحة والسوائل", "استخدمت مستشفيات العزل والحجر الصحي لإبطاء الانتشار"],
      medicines: ["لا توجد مضادات فيروسات خاصة بالإنفلونزا", "استخدم الأسبرين أحيانًا للأعراض", "لم تكن المضادات الحيوية للالتهاب الرئوي البكتيري الثانوي قد اكتشفت بعد"],
      prevention: ["تدابير الصحة العامة: الحجر الصحي، النظافة، استخدام المطهرات", "تقييد التجمعات العامة وإغلاق المدارس والمسارح", "لم يكن لقاح الإنفلونزا موجودًا في ذلك الوقت"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
      name: "شلل الأطفال (التهاب سنجابية النخاع)",
      description: "مرض معوق ومهدد للحياة يسببه فيروس شلل الأطفال. ينتشر الفيروس من شخص لآخر ويمكن أن يغزو دماغ الشخص المصاب وحبله الشوكي، مما يسبب الشلل. بفضل جهود التطعيم العالمية، تم القضاء عليه تقريبًا الآن.",
      symptoms: ["معظم الإصابات (حوالي 72٪) لا تظهر عليها أعراض", "يعاني البعض من أعراض تشبه الإنفلونزا (التهاب الحلق، حمى، إرهاق)", "تتطور نسبة أصغر إلى أعراض أكثر خطورة مثل التهاب السحايا", "أقل من 1٪ من الحالات تؤدي إلى شلل دائم"],
      causes: ["العدوى بفيروس شلل الأطفال", "يدخل الجسم عن طريق الفم، عادةً من الأيدي الملوثة ببراز شخص مصاب", "يمكن أن ينتشر أيضًا عن طريق الماء أو الطعام الملوث"],
      commonTreatments: ["لا يوجد علاج شافٍ لشلل الأطفال", "رعاية داعمة: الراحة، مسكنات الألم، العلاج الطبيعي لضعف العضلات", "استخدمت أجهزة التنفس الصناعي ('الرئة الحديدية') للمرضى الذين أصيبت عضلات التنفس لديهم بالشلل"],
      medicines: ["مسكنات الألم (مثل الإيبوبروفين)", "لا يوجد دواء مضاد للفيروسات يمكنه علاج شلل الأطفال"],
      prevention: ["لقاح شلل الأطفال المعطل (IPV) الذي يعطى عن طريق الحقن", "لقاح شلل الأطفال الفموي (OPV)", "التطعيم على نطاق واسع هو مفتاح القضاء على المرض"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "السكتة الدماغية",
        description: "حالة طبية طارئة تحدث عندما ينقطع أو يقل إمداد الدم إلى جزء من الدماغ، مما يمنع أنسجة المخ من الحصول على الأكسجين والعناصر الغذائية. تبدأ خلايا الدماغ في الموت في غضون دقائق.",
        symptoms: ["صعوبة في التحدث وفهم ما يقوله الآخرون", "شلل أو خدر في الوجه أو الذراع أو الساق", "مشاكل في الرؤية بإحدى العينين أو كلتيهما", "صداع شديد مفاجئ", "صعوبة في المشي"],
        causes: ["سكتة دماغية إقفارية (انسداد شريان)", "سكتة دماغية نزفية (تسرب أو انفجار وعاء دموي)", "ارتفاع ضغط الدم", "ارتفاع الكوليسترول", "التدخين", "السمنة", "السكري"],
        commonTreatments: ["أدوية تذويب الجلطات (tPA)", "إجراءات داخل الأوعية الدموية لإزالة الجلطات", "جراحة للسكتات الدماغية النزفية", "علاج إعادة التأهيل"],
        medicines: ["مذيبات الجلطات (مثل ألتيبلاز)", "أدوية مضادة للصفائح الدموية (مثل الأسبرين)", "مضادات التخثر (مثل الوارفارين)", "أدوية ضغط الدم"],
        prevention: ["السيطرة على ارتفاع ضغط الدم", "خفض الكوليسترول", "الإقلاع عن التدخين", "إدارة مرض السكري", "الحفاظ على وزن صحي", "ممارسة التمارين الرياضية بانتظام"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "الالتهاب الرئوي",
        description: "عدوى تسبب التهاب الحويصلات الهوائية في إحدى الرئتين أو كلتيهما. قد تمتلئ الحويصلات الهوائية بالسوائل أو القيح، مما يسبب سعالاً مصحوبًا ببلغم أو قيح، وحمى، وقشعريرة، وصعوبة في التنفس.",
        symptoms: ["ألم في الصدر عند التنفس أو السعال", "ارتباك أو تغيرات في الوعي العقلي (لدى البالغين 65 عامًا فأكثر)", "سعال قد ينتج بلغمًا", "تعب", "حمى وتعرق وقشعريرة", "ضيق في التنفس", "غثيان أو قيء أو إسهال"],
        causes: ["البكتيريا (مثل المكورات الرئوية)", "الفيروسات (مثل الأنفلونزا، كوفيد-19)", "الفطريات", "استنشاق الطعام أو السوائل إلى الرئتين"],
        commonTreatments: ["المضادات الحيوية للالتهاب الرئوي البكتيري", "الأدوية المضادة للفيروسات للالتهاب الرئوي الفيروسي", "الراحة", "تناول السوائل"],
        medicines: ["مضادات حيوية (مثل أموكسيسيلين، أزيثروميسين)", "مضادات الفيروسات (مثل أوسيلتاميفير)", "خافضات الحرارة (مثل أسيتامينوفين)", "دواء السعال"],
        prevention: ["التطعيم (لقاح المكورات الرئوية، لقاح الإنفلونزا)", "النظافة الجيدة (غسل اليدين)", "عدم التدخين", "الحفاظ على قوة جهاز المناعة"]
    }
  },
  {
    type: 'structured',
    medicalInfo: {
        name: "حصوات الكلى",
        description: "رواسب صلبة تتكون من المعادن والأملاح داخل الكلى. يمكن أن تؤثر على أي جزء من المسالك البولية — من الكليتين إلى المثانة.",
        symptoms: ["ألم حاد وشديد في الجانب والظهر، أسفل الأضلاع", "ألم يمتد إلى أسفل البطن والفخذ", "ألم أو حرقان أثناء التبول", "بول وردي أو أحمر أو بني", "بول عكر أو كريه الرائحة", "غثيان وقيء", "حاجة مستمرة للتبول"],
        causes: ["مستويات عالية من الكالسيوم والأكسالات وحمض اليوريك في البول", "عدم شرب كمية كافية من الماء", "السمنة", "أنظمة غذائية معينة وحالات طبية"],
        commonTreatments: ["شرب الماء لطرد الحصوة", "مسكنات الألم", "إجراءات طبية مثل تفتيت الحصوات بالموجات الصدمية أو تنظير الحالب لتفتيت أو إزالة الحصوات الكبيرة"],
        medicines: ["مسكنات الألم (مثل إيبوبروفين)", "حاصرات ألفا (مثل تامسولوسين) لإرخاء عضلات الحالب", "مدرات البول"],
        prevention: ["شرب كمية وافرة من الماء", "تناول كميات أقل من الأطعمة الغنية بالأكسالات", "اختيار نظام غذائي منخفض الملح والبروتين الحيواني", "استخدام الأدوية الوقائية"]
    }
  },
];


export const preCannedData: Record<Language, StructuredSearchResultData[]> = {
  en: enData,
  ar: arData,
};
