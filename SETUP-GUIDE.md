# 🚀 OpenAI API Setup Guide

## Quick Setup (2 Options)

### Option 1: Get Your Own API Key (Recommended)

1. **Visit OpenAI Platform**: https://platform.openai.com/api-keys
2. **Sign up/Login**: Create account or log in
3. **Create API Key**: Click "Create new secret key"
4. **Copy the Key**: It looks like `sk-1234567890abcdef...`
5. **Add Payment**: Add credit card to your OpenAI account

### Option 2: Use Demo Mode (No API Key Needed)

The app now works in demo mode! You can test the AI chatbot without an API key.

## 📁 Create .env.local File

Create a file named `.env.local` in your project root (same folder as `package.json`):

```bash
# .env.local
OPENAI_API_KEY=sk-your-actual-api-key-here
```

## 🔧 Test Your Setup

1. **Restart your server**:
   ```bash
   npm run dev
   ```

2. **Test API connection**:
   Visit: `http://localhost:3000/api/test-openai`

3. **Test the chatbot**:
   - Fill in some patient data
   - Click "AI-ChatBot" button
   - You'll see either real AI recommendations or demo data

## 📋 Sample Data for Testing

### Subjective Notes/Chief Complaint:
```
Patient presents with severe chest pain that started 2 hours ago while watching TV. Pain is described as crushing, radiating to left arm and jaw. Associated with shortness of breath, diaphoresis, and nausea. Pain is 8/10 in intensity. No relief with rest or position change. Patient has history of hypertension and diabetes. No recent trauma or injury.
```

### Physical Examination:
```
GENERAL: Alert, oriented, in moderate distress due to chest pain
VITALS: Temperature 98.6°F, BP 160/95 mmHg, HR 110 bpm, RR 22/min, O2 sat 94% on RA
HEENT: Normocephalic, atraumatic, PERRLA, no JVD
CARDIOVASCULAR: Tachycardic, regular rhythm, S1/S2 normal, no murmurs, gallops, or rubs
RESPIRATORY: Clear to auscultation bilaterally, no wheezes, rales, or rhonchi
ABDOMEN: Soft, non-tender, non-distended, no hepatosplenomegaly
EXTREMITIES: Warm, well-perfused, no edema, 2+ pulses throughout
NEUROLOGIC: CN II-XII intact, motor/sensory normal, no focal deficits
```

### Assessment/Diagnosis:
```
PRIMARY DIAGNOSIS:
- Acute coronary syndrome, rule out myocardial infarction
- Hypertension, uncontrolled
- Type 2 diabetes mellitus

DIFFERENTIAL DIAGNOSIS:
- Unstable angina
- Non-ST elevation myocardial infarction (NSTEMI)
- Gastroesophageal reflux disease (GERD)
- Musculoskeletal chest pain
- Anxiety/panic attack

ASSESSMENT:
Patient presents with classic symptoms of acute coronary syndrome. Risk factors include hypertension, diabetes, and age. EKG and cardiac enzymes needed to rule out myocardial infarction. Immediate cardiac evaluation and monitoring required.
```

### Treatment Plan:
```
IMMEDIATE INTERVENTIONS:
1. Continuous cardiac monitoring
2. IV access established
3. Aspirin 325mg PO given
4. Nitroglycerin 0.4mg SL for chest pain relief
5. Morphine 2mg IV for pain control if needed

DIAGNOSTIC WORKUP:
1. 12-lead EKG STAT
2. Cardiac enzymes (troponin, CK-MB) q3h x3
3. Chest X-ray
4. Complete blood count, comprehensive metabolic panel
5. Lipid panel

MEDICATIONS:
- Aspirin 81mg PO daily
- Metoprolol 25mg PO BID
- Atorvastatin 40mg PO daily
- Lisinopril 10mg PO daily
- Metformin 500mg PO BID

FOLLOW-UP:
- Cardiology consultation for cardiac catheterization evaluation
- Discharge planning with cardiac rehabilitation referral
- Follow-up with primary care physician in 1 week
- Lifestyle modifications: smoking cessation, diet, exercise
```

## ✅ What Works Now

- **Demo Mode**: Works without API key (shows sample recommendations)
- **Real AI Mode**: Works with valid OpenAI API key
- **Error Handling**: Graceful fallback to demo data if API fails
- **Testing**: Built-in API test endpoint

## 🎯 Next Steps

1. **Test the demo mode** with the sample data above
2. **Get an OpenAI API key** if you want real AI recommendations
3. **Configure the .env.local file** with your API key
4. **Restart the server** and test again

The app is now fully functional in both demo and real AI modes! 🎉 