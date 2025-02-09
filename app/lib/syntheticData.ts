import { faker } from "@faker-js/faker"

function generateRealisticReasonForReferral(): string {
  const reasons = [
    "Persistent lower back pain unresponsive to conservative treatment",
    "Unexplained weight loss and fatigue",
    "Recurrent migraines with visual aura",
    "Abnormal mammogram results requiring further investigation",
    "Elevated blood pressure resistant to lifestyle modifications",
    "Chronic knee pain affecting mobility",
    "Unexplained gastrointestinal symptoms",
    "Suspicious mole with recent changes in appearance",
    "Persistent cough and shortness of breath",
    "Irregular heart palpitations and dizziness",
  ]
  return faker.helpers.arrayElement(reasons)
}

function generateRealisticClinicalNotes(): string {
  const notesComponents = [
    "Patient reports {symptom} for {duration}.",
    "Physical examination reveals {finding}.",
    "Previous treatment with {treatment} showed {outcome}.",
    "Family history significant for {condition}.",
    "Patient denies {symptom}.",
    "Laboratory results show {labResult}.",
    "Recommend {recommendation} for further evaluation.",
  ]

  const symptoms = ["pain", "discomfort", "fatigue", "nausea", "dizziness", "shortness of breath"]
  const durations = ["2 weeks", "1 month", "3 months", "6 months", "over a year"]
  const findings = [
    "tenderness on palpation",
    "decreased range of motion",
    "elevated blood pressure",
    "skin discoloration",
    "abnormal heart sounds",
  ]
  const treatments = [
    "NSAIDs",
    "physical therapy",
    "dietary changes",
    "antihypertensive medication",
    "topical steroids",
  ]
  const outcomes = ["minimal improvement", "moderate relief", "no significant change", "temporary improvement"]
  const conditions = ["diabetes", "hypertension", "cancer", "heart disease", "autoimmune disorders"]
  const labResults = [
    "elevated white blood cell count",
    "abnormal liver function tests",
    "high cholesterol levels",
    "low vitamin D levels",
    "positive for H. pylori",
  ]
  const recommendations = ["referral to specialist", "imaging studies", "blood work", "stress test", "biopsy"]

  const generateNote = (template: string) => {
    return template
      .replace("{symptom}", faker.helpers.arrayElement(symptoms))
      .replace("{duration}", faker.helpers.arrayElement(durations))
      .replace("{finding}", faker.helpers.arrayElement(findings))
      .replace("{treatment}", faker.helpers.arrayElement(treatments))
      .replace("{outcome}", faker.helpers.arrayElement(outcomes))
      .replace("{condition}", faker.helpers.arrayElement(conditions))
      .replace("{labResult}", faker.helpers.arrayElement(labResults))
      .replace("{recommendation}", faker.helpers.arrayElement(recommendations))
  }

  const numberOfNotes = faker.number.int({ min: 2, max: 4 })
  const selectedNotes = faker.helpers.arrayElements(notesComponents, numberOfNotes)
  return selectedNotes.map(generateNote).join(" ")
}

function generateAustralianPhoneNumber(): string {
  // Generate a valid Australian mobile number
  const prefix = "04"
  const remainingDigits = faker.number.int({ min: 10000000, max: 99999999 }).toString().padStart(8, "0")
  return `${prefix}${remainingDigits}`
}

export function generateSyntheticData() {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  // Generate a more realistic Australian address
  const streetNumber = faker.number.int({ min: 1, max: 999 })
  const streetName = faker.location.street()
  const suburb = faker.location.city()
  const state = faker.helpers.arrayElement(["VIC", "NSW", "QLD", "WA", "SA", "TAS", "ACT", "NT"])

  const address = `${streetNumber} ${streetName}, ${suburb} ${state}, Australia`

  return {
    firstName,
    lastName,
    dateOfBirth: faker.date.birthdate({ min: 18, max: 85, mode: "age" }),
    gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
    email: faker.internet.email({ firstName, lastName }),
    phoneNumber: generateAustralianPhoneNumber(),
    address,
    medicareNumber: faker.number.int({ min: 2000000000, max: 6999999999 }).toString(),
    reasonForReferral: generateRealisticReasonForReferral(),
    urgencyLevel: faker.helpers.arrayElement(["Routine", "Urgent", "Emergency"]),
    clinicalNotes: generateRealisticClinicalNotes(),
  }
}

