function runner() {
  console.log('runner');
}

function main() {
  return {
    meta: {
      name: 'Manga Fox',
      description: 'Manga fox crawler',
      version: '1.0.0',
      icon: 'data:image/png;base64,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',
    },
    runnerFunction: runner,
  };
}

// Call main
main();
