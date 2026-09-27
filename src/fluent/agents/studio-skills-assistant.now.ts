import '@servicenow/sdk/global'
import { AiAgent } from '@servicenow/sdk/core'

export const studioSkillsAssistant = AiAgent({
  $id: Now.ID['studio_skills_assistant_agent'],
  name: 'Studio Skills Assistant',
  description:
    'Forecast Variance assistant that exposes the platform Build Agent skill family (Build Agent, Build Agent Preprocessor, BA Glide Tools Metadata Summarizer) for use in the WDF Lab.',
  agentRole: 'Studio Skills Assistant',
  recordType: 'custom',
  securityAcl: {
    $id: Now.ID['studio_skills_assistant_agent_acl'],
    type: 'Any authenticated user',
  },
  dataAccess: {
    roleMap: ['admin'],
  },

  versionDetails: [
    {
      name: 'V1',
      number: 1,
      state: 'published',
      instructions:
        'You have three tools, each wrapping a native platform skill from the Build Agent skill family: "Build Agent", "Build Agent Preprocessor", and "BA Glide Tools Metadata Summarizer". When the user asks for something those skills would normally do inside Studio, call the matching tool and return its result plainly.',
    },
  ],

  tools: [
    {
      name: 'Build Agent',
      description: 'Wraps the native Now Assist skill Build Agent.',
      type: 'capability',
      capabilityId: 'f4920c03ff6d6210509bfffffffffff7',
    },
    {
      name: 'Build Agent Preprocessor',
      description: 'Wraps the native Now Assist skill Build Agent Preprocessor.',
      type: 'capability',
      capabilityId: '756b5687ff4eb2502e62ffffffffffc7',
    },
    {
      name: 'BA Glide Tools Metadata Summarizer',
      description: 'Wraps the native Now Assist skill BA Glide Tools Metadata Summarizer.',
      type: 'capability',
      capabilityId: '3aed757f53d13210d7ecddeeff7b12de',
    },
  ],
})
